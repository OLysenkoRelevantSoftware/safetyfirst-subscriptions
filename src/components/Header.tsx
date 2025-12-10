"use client";

import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import theme from "@/theme";

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: `linear-gradient(180deg, ${theme.palette.grey[200]} 0%, ${theme.palette.grey[200]} 40%, #ffffff 40%, #ffffff 100%)`,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href="https://redtraining.com/safetyfirst/"
              sx={{ display: "inline-block", mr: 2 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo.svg"
                alt="SafetyFirst"
                width={140}
                height={106}
                style={{ display: "block" }}
              />
            </Link>
          </Box>

          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", alignSelf: "start" }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              <Link
                href="tel:+443713460798"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightBold,
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                <Image
                  src="/phone.svg"
                  alt="Phone"
                  width={15}
                  height={15}
                  style={{ marginRight: 8 }}
                />
                0371 346 0798
              </Link>
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
