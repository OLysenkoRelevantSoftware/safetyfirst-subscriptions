"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { SINGLE_DRIVER, PEOPLE_COMPANY } from "@/constants";

const planNames = {
  [SINGLE_DRIVER]: '"Single driver" subscription plan',
  [PEOPLE_COMPANY]: '"Small Company" subscription plan',
};

function PaidContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") as
    | typeof SINGLE_DRIVER
    | typeof PEOPLE_COMPANY
    | null;

  const planName =
    plan && planNames[plan] ? planNames[plan] : "your subscription";

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 80,
                  color: "success.main",
                }}
              />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Payment Successful!
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Thank you for subscribing to {planName}. Your payment has been
              successfully processed.
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              You will receive a confirmation email shortly with all the details
              of your subscription.
            </Typography>

            <Button
              variant="contained"
              size="large"
              component={NextLink}
              href="/"
              fullWidth
              sx={{ mt: 2 }}
            >
              Back to Homepage
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default function Paid() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="lg">
          <Box
            sx={{
              my: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      }
    >
      <PaidContent />
    </Suspense>
  );
}
