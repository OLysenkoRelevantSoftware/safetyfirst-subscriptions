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

    // Create or get a customer
    const customer = await stripe.customers.create({
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

    // Create a subscription using the provided priceId
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      // Collection method via invoice will attempt payment immediately using default source
      collection_method: "charge_automatically",
      // Expand latest invoice payment intent for richer status if needed
      expand: ["latest_invoice.payment_intent"],
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
