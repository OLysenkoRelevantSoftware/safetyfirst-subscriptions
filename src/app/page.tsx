"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";

import { SINGLE_DRIVER, PEOPLE_COMPANY } from "@/constants";

export default function Home() {
  const theme = useTheme();

  const plans = [
    {
      id: SINGLE_DRIVER,
      title: "Single driver",
      priceMonthly: "£1.49",
      periodMonthly: "Monthly",
      priceYearly: "£15.99",
      periodYearly: "Annual",
      commentYearly: "*Min 3-month term",
      features: ["eLearning"],
      cta: "Subscribe",
    },
    {
      id: PEOPLE_COMPANY,
      title: "2-20(50) people company",
      priceMonthly: "£3.49",
      periodMonthly: "Monthly",
      priceYearly: "£36.99",
      periodYearly: "Annual",
      commentYearly: "*Min 3-month term",
      features: [
        "DVLA (5/annual/driver)",
        "Risk Assessment (8/annual/driver)",
        "Quarterly eLearning (no ability to set the cadence)",
      ],
      cta: "Subscribe",
    },
  ];

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
              Visibility. Simplicity. Control – sorted
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: theme.spacing(4), color: "text.secondary" }}
            >
              With RED Corporate Driver Training, not only can we provide the
              specific driver training and driver risk management products,
              training course services and other interventions for your drivers,
              SafetyFirst is the platform to ensure all information on all your
              drivers is visible, present, correct and helping you to run a
              safer and more efficient operation.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: theme.spacing(4), color: "text.secondary" }}
            >
              It is also easy to access as an individual driver to populate core
              identity details, complete tasks requested of them such as online
              driver assessments, e-learning training modules and more.
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
            spacing={6}
            sx={{
              justifyContent: "center",
              mb: theme.spacing(4),
              width: "100%",
              maxWidth: "850px",
            }}
          >
            {plans.map((plan) => (
              <Grid
                sx={{ xs: 12, md: 6, width: "100%", maxWidth: "400px" }}
                key={plan.id}
              >
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ mb: theme.spacing(1) }}
                    >
                      {plan.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        mb: theme.spacing(2),
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{ mr: theme.spacing(1) }}
                      >
                        {plan.priceMonthly}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        /{plan.periodMonthly}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        mb: theme.spacing(2),
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="span"
                        sx={{ mr: theme.spacing(1) }}
                      >
                        {plan.priceYearly}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        /{plan.periodYearly} ({plan.commentYearly})
                      </Typography>
                    </Box>

                    <List dense>
                      {plan.features.map((f) => (
                        <ListItem key={f}>
                          <ListItemIcon>
                            <CheckIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={f} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>

                  <CardActions sx={{ p: theme.spacing(2) }}>
                    <Button
                      component={Link}
                      href={`/checkout/${plan.id}`}
                      fullWidth
                      variant={
                        plan.id === "people-company" ? "contained" : "outlined"
                      }
                      color="primary"
                    >
                      {plan.cta}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
