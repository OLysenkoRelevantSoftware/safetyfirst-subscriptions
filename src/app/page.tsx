"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import theme from "@/theme";
import { plans } from "@/features/subscriptions";
import { SubscriptionCard } from "@/features/subscriptions";

export default function Home() {
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            pt: theme.spacing(4),
            pb: theme.spacing(2),
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: theme.spacing(2) }}
            >
              The RED Corporate Driver Training platform to support your own
              driver safety programme.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: theme.spacing(4), color: "text.secondary" }}
            >
              Having a simple, flexible but professionally developed system will
              help you save time, money, manage your occupational road risk and
              save lives. Take your driving performance and road safety to the
              next level with our new subscription plans, tailored for single
              drivers and small companies. Explore the options and choose the
              plan that supports your growth.
            </Typography>
          </Container>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: theme.spacing(4),
          }}
        >
          <Typography
            variant="h6"
            component="p"
            sx={{ mb: theme.spacing(4), color: "text.secondary" }}
          >
            Choose a subscription plan that fits your needs.
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              mb: theme.spacing(4),
              width: "100%",
              maxWidth: "1150px",
            }}
          >
            {plans.map((plan) => (
              <SubscriptionCard key={plan.id} plan={plan} />
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
