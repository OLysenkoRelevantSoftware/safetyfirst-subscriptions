"use client";

import { useState } from "react";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { SINGLE_DRIVER } from "@/constants";
import { PaymentForm } from "@/features/subscriptions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
);

const prices = {
  monthly: {
    id: process.env.NEXT_PUBLIC_STRIPE_SINGLE_DRIVER_PRICE_MONTHLY,
    value: "£1.49",
    title: "Monthly",
    subtitle: "(*Min 3-month term)",
  },
  yearly: {
    id: process.env.NEXT_PUBLIC_STRIPE_SINGLE_DRIVER_PRICE_YEARLY,
    value: "£15.99",
    title: "Annual",
    subtitle: "",
  },
};

const fields = [
  {
    name: "firstname",
    type: "text",
    required: true,
    label: "First Name",
  },
  {
    name: "lastname",
    type: "text",
    required: true,
    label: "Last Name",
  },
  {
    name: "email",
    type: "text",
    required: true,
    label: "Email",
  },
  {
    name: "phone",
    type: "text",
    required: false,
    label: "Phone",
  },
  {
    name: "companyName",
    type: "text",
    required: false,
    label: "Company Name",
  },
];

export default function SingleDriverPage() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

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
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Subscription Plan Details
        </Typography>

        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            width: "100%",
            gap: 4,
          }}
        >
          <Card sx={{ maxWidth: 500, mb: 4, width: "100%", height: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Plan Summary
              </Typography>
              <Divider sx={{ my: 1.5 }} />

              <Typography
                variant="h6"
                component="h2"
                sx={{ mb: 0.5, textAlign: "center" }}
              >
                eLearning modules:
              </Typography>
              <Typography variant="body1" component="div">
                • Motorway driving
                <br />
                • Rural driving
                <br />
                • Urban driving
                <br />
                • Speed awareness
                <br />
                • Fatigue
                <br />
                • Share the Road
                <br />
                • Eco-driving (good for fossil fuel or alternatively powered
                vehicles)
                <br />• Parking and slow-speed manoeuvring
              </Typography>

              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 4, mb: 0.5, textAlign: "center" }}
              >
                Select preferable plan
              </Typography>
              <RadioGroup
                row
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value as "monthly" | "yearly")
                }
                sx={{ justifyContent: "center", mb: 4, gap: 2 }}
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

              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total</Typography>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h6" color="primary">
                    {prices[period].value} / {prices[period].title}
                  </Typography>
                  {prices[period].subtitle && (
                    <Typography variant="body2" color="text.secondary">
                      {prices[period].subtitle}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 500, mb: 4, width: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Payment Details
              </Typography>
              <Divider sx={{ mt: 1.5, mb: 2 }} />

              <Elements stripe={stripePromise}>
                <PaymentForm
                  priceId={prices[period].id}
                  successUrl={`/paid?plan=${SINGLE_DRIVER}`}
                  fields={fields}
                />
              </Elements>

              <Button
                variant="outlined"
                component={NextLink}
                href="/"
                fullWidth
              >
                Homepage
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
