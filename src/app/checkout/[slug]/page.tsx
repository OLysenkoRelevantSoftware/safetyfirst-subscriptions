'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';

import { SINGLE_DRIVER, PEOPLE_COMPANY } from '@/constants';

export default function About() {
  const params = useParams() as { slug?: string };
  const subscriptionPlan = params?.slug ?? '';

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {[SINGLE_DRIVER, PEOPLE_COMPANY].includes(subscriptionPlan) ? (
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Payment process
          </Typography>
        ) : (
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Invalid subscription plan.
          </Typography>
        )}

        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={NextLink} href="/">
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
