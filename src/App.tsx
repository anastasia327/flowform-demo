import React from "react";
import { Box, Container, Typography, Stack, Chip } from "@mui/material";
import { MultiStepForm } from "./components/MultiStepForm";
import { clientOnboardingSchema } from "./data/formSchema";
import { monoFont } from "./theme";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 4, sm: 8 } }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={1} sx={{ mb: 5, textAlign: "center" }}>
          <Chip
            label="DEMO"
            size="small"
            sx={{
              fontFamily: monoFont,
              fontSize: 11,
              bgcolor: "transparent",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
          <Typography variant="h3" sx={{ fontSize: { xs: 26, sm: 34 } }}>
            FlowForm — Multi-Step Form Kit
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
            Every field below is generated from a single schema file — conditional
            fields, repeatable rows, validation and PDF export included. See{" "}
            <code>src/data/formSchema.ts</code> to change the form.
          </Typography>
        </Stack>

        <MultiStepForm schema={clientOnboardingSchema} />

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 6, fontSize: 12, fontFamily: monoFont }}
        >
          FlowForm Kit v1.0 — built with React, MUI, react-hook-form & yup
        </Typography>
      </Container>
    </Box>
  );
}
