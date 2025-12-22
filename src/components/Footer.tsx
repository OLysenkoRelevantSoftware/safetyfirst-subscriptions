"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import theme from "@/theme";

export const Footer = () => {
  const phoneHref = "+443713460798";
  const phoneDisplay = "0371 346 0798";
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.grey[900],
        color: "#ffffff",
        py: theme.spacing(3),
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
            More details{" "}
            <Link
              href="https://redtraining.com/"
              color={theme.palette.primary.main}
              underline="hover"
            >
              here!
            </Link>{" "}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link
              href={`tel:${phoneHref}`}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                color: "#ffffff",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              <Image
                src="/phone.svg"
                alt="phone"
                width={18}
                height={18}
                style={{ marginRight: 8 }}
              />
              {phoneDisplay}
            </Link>

            <Link
              href="https://www.linkedin.com/company/red-fleet-driver-training/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                padding: "2px 8px",
                fontWeight: theme.typography.fontWeightBold,
                fontSize: theme.typography.h6.fontSize,
              }}
            >
              in
            </Link>
          </Box>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.65)" }}
          >
            © {currentYear} RED Training. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
