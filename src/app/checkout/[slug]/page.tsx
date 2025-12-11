"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { SINGLE_DRIVER, PEOPLE_COMPANY } from "@/constants";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
);

const plans = {
  [SINGLE_DRIVER]: {
    name: '"Single driver" subscription plan',
    priceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_SINGLE_DRIVER_PRICE_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_STRIPE_SINGLE_DRIVER_PRICE_YEARLY,
    },
    priceTitles: {
      monthly: "£1.49",
      yearly: "£15.99",
    },
  },
  [PEOPLE_COMPANY]: {
    name: '"2-20(50) people company" subscription plan',
    priceIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PEOPLE_COMPANY_PRICE_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PEOPLE_COMPANY_PRICE_YEARLY,
    },
    priceTitles: {
      monthly: "£3.49",
      yearly: "£36.99",
    },
  },
};

function PaymentForm({
  subscriptionPlan,
  billingPeriod,
}: {
  subscriptionPlan: typeof SINGLE_DRIVER | typeof PEOPLE_COMPANY;
  billingPeriod: "monthly" | "yearly";
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    companyName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Форма карти не завантажена");
      }

      const { token } = await stripe.createToken(cardElement);

      if (!token) {
        throw new Error("Помилка при створенні токену");
      }

      const priceId = plans[subscriptionPlan].priceIds[billingPeriod];

      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          token: token.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Помилка при обробці платежу");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Невідома помилка при платежі",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert severity="success">
        Платіж успішно оброблений! Спасибі за підписку.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            required
            label="Ім'я"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            label="Прізвище"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Box>
        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          label="Телефон"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Назва компанії"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          variant="outlined"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Дані платіжної карти
        </Typography>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424242",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={!stripe || loading}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Оплатити"}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const params = useParams() as { slug?: string };
  const subscriptionPlan: typeof SINGLE_DRIVER | typeof PEOPLE_COMPANY =
    params?.slug as typeof SINGLE_DRIVER | typeof PEOPLE_COMPANY;
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const isValidPlan = [SINGLE_DRIVER, PEOPLE_COMPANY].includes(
    subscriptionPlan,
  );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isValidPlan ? (
          <>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
              You will pay for {plans[subscriptionPlan].name}
            </Typography>

            <Card sx={{ maxWidth: 500, mb: 4, width: "100%" }}>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <RadioGroup
                    row
                    value={billingPeriod}
                    onChange={(e) =>
                      setBillingPeriod(e.target.value as "monthly" | "yearly")
                    }
                    sx={{ justifyContent: "center", mb: 3, gap: 2 }}
                  >
                    <FormControlLabel
                      value="monthly"
                      control={<Radio />}
                      label="Monthly"
                    />
                    <FormControlLabel
                      value="yearly"
                      control={<Radio />}
                      label="Annual"
                    />
                  </RadioGroup>

                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                      {plans[subscriptionPlan].priceTitles[billingPeriod]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {billingPeriod === "monthly"
                        ? "Monthly"
                        : "Annual (*Min 3-month term)"}
                    </Typography>
                  </Box>
                </Box>

                <Elements stripe={stripePromise}>
                  <PaymentForm
                    subscriptionPlan={subscriptionPlan}
                    billingPeriod={billingPeriod}
                  />
                </Elements>

                <Button
                  variant="outlined"
                  component={NextLink}
                  href="/"
                  fullWidth
                >
                  To Homepage
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Invalid subscription plan.
            </Typography>

            <Box sx={{ maxWidth: "sm" }}>
              <Button variant="contained" component={NextLink} href="/">
                To Homepage
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
