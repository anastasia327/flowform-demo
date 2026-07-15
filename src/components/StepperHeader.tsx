import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { monoFont } from "../theme";

interface StepperHeaderProps {
  steps: { id: string; title: string }[];
  activeIndex: number;
}

/**
 * The kit's signature element: a "ledger" stepper. Step numbers are set in
 * a monospace face — like line numbers in a data file — reinforcing that
 * this is a schema-driven, data-first form kit rather than a decorative one.
 */
export function StepperHeader({ steps, activeIndex }: StepperHeaderProps) {
  return (
    <Stack spacing={0} sx={{ minWidth: 220 }}>
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        return (
          <Stack key={step.id} direction="row" spacing={1.5} sx={{ position: "relative", pb: 3 }}>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  left: 13,
                  top: 28,
                  bottom: 0,
                  width: "1px",
                  bgcolor: isDone ? "secondary.main" : "divider",
                }}
              />
            )}
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                bgcolor: isDone ? "secondary.main" : isActive ? "primary.main" : "transparent",
                border: "1px solid",
                borderColor: isDone ? "secondary.main" : isActive ? "primary.main" : "divider",
                fontFamily: monoFont,
                fontSize: 12,
                color: isDone || isActive ? "#fff" : "text.secondary",
                fontWeight: 600,
              }}
            >
              {isDone ? <CheckIcon sx={{ fontSize: 16 }} /> : String(index + 1).padStart(2, "0")}
            </Box>
            <Box sx={{ pt: 0.2 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "text.primary" : "text.secondary",
                }}
              >
                {step.title}
              </Typography>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
}
