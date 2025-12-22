"use client";

import { useState, useMemo } from "react";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { PEOPLE_COMPANY } from "@/constants";
import { PaymentForm } from "@/features/subscriptions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
);

const prices = {
  monthly: {
    id: process.env.NEXT_PUBLIC_STRIPE_PEOPLE_COMPANY_PRICE_MONTHLY,
    value: 3.49,
    title: "Monthly (*Min 3-month term)",
  },
  yearly: {
    id: process.env.NEXT_PUBLIC_STRIPE_PEOPLE_COMPANY_PRICE_YEARLY,
    value: 36.99,
    title: "Annual",
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
    required: true,
    label: "Company Name",
  },
];

export default function SmallCompanyPage() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [driversCount, setDriversCount] = useState<number>(2);

  const priceValue = useMemo(() => {
    const price = Math.round(prices[period].value * driversCount * 100) / 100;
    const priceStr = `£${price}`;
    const end = priceStr.split(".")[1] || "";
    if (end.length === 1) {
      return priceStr + "0";
    } else if (end.length === 0) {
      return priceStr + ".00";
    } else {
      return priceStr;
    }
  }, [period, driversCount]);

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

        <Box sx={{ mb: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h6" component="h2" sx={{ mb: 0.5 }}>
            Plan consists of:
          </Typography>
          <Typography variant="body1" component="div">
            • DVLA check every 6 months
            <br />
            • Risk Assessment
            <br />• Quarterly eLearning
          </Typography>
        </Box>

        <Card sx={{ maxWidth: 500, mb: 4, width: "100%" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mb: 0.5, textAlign: "center" }}
            >
              Select preferable plan
            </Typography>
            <Box sx={{ mb: 3 }}>
              <RadioGroup
                row
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value as "monthly" | "yearly")
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

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="drivers-count-label">
                  Number of Drivers
                </InputLabel>
                <Select
                  labelId="drivers-count-label"
                  value={driversCount}
                  label="Number of Drivers"
                  onChange={(e) => setDriversCount(e.target.value as number)}
                  renderValue={(value) => `${value} drivers`}
                >
                  {Array.from({ length: 49 }, (_, i) => i + 2).map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h5" component="p" sx={{ mb: 2 }}>
                  {priceValue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prices[period].title}
                </Typography>
              </Box>
            </Box>

            <Elements stripe={stripePromise}>
              <PaymentForm
                priceId={prices[period].id}
                successUrl={`/paid?plan=${PEOPLE_COMPANY}`}
                fields={fields}
                quantity={driversCount}
              />
            </Elements>

            <Button variant="outlined" component={NextLink} href="/" fullWidth>
              Homepage
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
