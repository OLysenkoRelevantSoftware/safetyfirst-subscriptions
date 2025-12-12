"use client";

import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { SINGLE_DRIVER, PEOPLE_COMPANY } from "@/constants";

const planNames = {
  [SINGLE_DRIVER]: '"Single driver" subscription plan',
  [PEOPLE_COMPANY]: '"2-20(50) people company" subscription plan',
};

export default function Paid() {
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
