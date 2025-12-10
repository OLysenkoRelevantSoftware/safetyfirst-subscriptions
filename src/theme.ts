'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#df2b2f',
      light: '#ff7b8a',
      dark: '#8b0f1f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8c00',
      light: '#ffc947',
      dark: '#c66900',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f6f7f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#102027',
      secondary: '#5f6b6f',
    },
    grey: {
      200: '#e3e8eb',
    },
  },

  typography: {
    fontFamily: '"Open Sans", "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { color: '#5f6b6f' },
    button: { textTransform: 'none', fontWeight: 600 },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 16px',
        },
        containedPrimary: {
          boxShadow: 'none',
        },
        outlined: {
          borderWidth: 1,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 4px 12px rgba(16,24,40,0.06)',
          border: '1px solid rgba(16,24,40,0.04)',
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
          color: '#2e7d32',
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#102027',
        },
      },
    },
  },
});

export default theme;
