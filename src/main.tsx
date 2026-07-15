import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root")!);

function renderApp() {
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

const FONT_LOAD_TIMEOUT_MS = 300;

if ("fonts" in document) {
  Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, FONT_LOAD_TIMEOUT_MS)),
  ]).then(renderApp);
} else {
  renderApp();
}