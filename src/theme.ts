import { createTheme } from "@mui/material/styles";

// Design tokens
// Background: cool paper (#F5F6F4) — not the generic warm-cream default
// Primary: deep indigo-navy (#2B3A67) — structured, "ledger" feel
// Accent: teal-emerald (#0E8C74) — progress / success
// Highlight: amber (#E0A100) — active/attention states
// Ink: near-black navy (#1B1F2A)
// Mono face (IBM Plex Mono) used sparingly for step numbers & data values,
// reinforcing that this is a *data* product, not just a pretty form.

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5F6F4",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#2B3A67",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0E8C74",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#E0A100",
    },
    text: {
      primary: "#1B1F2A",
      secondary: "#5B6472",
    },
    divider: "#E2E4E0",
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: '"Manrope", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Manrope", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"Manrope", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          boxShadow: "none",
        },
        containedPrimary: {
          "&:hover": { boxShadow: "none", backgroundColor: "#1F2A4D" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export const monoFont = '"IBM Plex Mono", "Courier New", monospace';
