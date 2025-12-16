import { NextRequest } from "next/server";
import Stripe from "stripe";

let stripe: Stripe | null = null;

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY environment variable");
} else {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Stripe is not configured on server.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const {
      priceId,
      token, // token.id from Stripe Elements createToken
      firstname,
      lastname,
      email,
      phone,
      companyName,
    } = body || {};

    if (!priceId || typeof priceId !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing or invalid priceId.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid token." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid email." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Search for existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer: Stripe.Customer;

    if (existingCustomers.data.length > 0) {
      // Customer exists - use existing one
      customer = existingCustomers.data[0];

      // Update customer info if provided
      if (firstname || lastname || phone || companyName) {
        customer = await stripe.customers.update(customer.id, {
          name: [firstname, lastname].filter(Boolean).join(" ") || undefined,
          phone: phone || undefined,
          description: companyName ? `Company: ${companyName}` : undefined,
          metadata: {
            firstname: firstname || customer.metadata.firstname || "",
            lastname: lastname || customer.metadata.lastname || "",
            companyName: companyName || customer.metadata.companyName || "",
          },
        });
      }

      // Add payment method to existing customer
      await stripe.customers.createSource(customer.id, { source: token });
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email,
        name: [firstname, lastname].join(" "),
        phone: phone,
        description: companyName ? `Company: ${companyName}` : undefined,
        metadata: {
          firstname: firstname || "",
          lastname: lastname || "",
          companyName: companyName || "",
        },
        source: token,
      });
    }

    // Create a subscription using the provided priceId
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      // Collection method via invoice will attempt payment immediately using default source
      collection_method: "charge_automatically",
      // Expand latest invoice payment intent for richer status if needed
      expand: ["latest_invoice.payment_intent"],
      // Automatically send receipt email
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
    });

    // Determine immediate success based on status
    const status = subscription.status; // trialing, active, past_due, etc.
    const isActiveOrTrial = status === "active" || status === "trialing";

    return new Response(
      JSON.stringify({
        success: isActiveOrTrial,
        subscriptionId: subscription.id,
        status,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const dynamic = "force-dynamic";
