"use client";

import Link from "next/link";
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

import theme from "@/theme";
import { PlanModel } from "./types";

export const SubscriptionCard = ({ plan }: { plan: PlanModel }) => {
  return (
    <Grid
      sx={{ xs: 12, md: 6, width: "100%", maxWidth: "370px", height: "400px" }}
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
          <Box sx={{ mb: theme.spacing(2) }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
              }}
            >
              {plan.title}
            </Typography>
            {plan.subtitle ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: theme.spacing(0.5),
                  textAlign: "center",
                }}
              >
                {plan.subtitle}
              </Typography>
            ) : (
              <Box sx={{ py: theme.spacing(1.5) }} />
            )}
          </Box>

          {plan.description && (
            <Box sx={{ mb: theme.spacing(2) }}>
              <Typography variant="body2" color="text.secondary">
                {plan.description}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: plan.priceMonthly ? "flex" : "none",
              alignItems: "baseline",
              mb: theme.spacing(1),
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{ mr: theme.spacing(1), fontSize: "1.2rem" }}
            >
              {plan.priceMonthly}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              / {plan.periodMonthly}
              {plan.commentMonthly ? ` (${plan.commentMonthly})` : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: plan.priceYearly ? "flex" : "none",
              alignItems: "baseline",
              mb: theme.spacing(2),
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{ mr: theme.spacing(1), fontSize: "1.2rem" }}
            >
              {plan.priceYearly}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              / {plan.periodYearly}
              {plan.commentYearly ? ` (${plan.commentYearly})` : ""}
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

        <CardActions sx={{ p: theme.spacing(2), pt: 0 }}>
          <Button
            component={Link}
            href={plan.ctaLink}
            fullWidth
            variant="contained"
            color="primary"
          >
            {plan.ctaLabel}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
