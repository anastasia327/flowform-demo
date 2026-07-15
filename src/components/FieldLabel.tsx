import React from "react";
import { Typography, Box } from "@mui/material";

interface FieldLabelProps {
  label: string;
  required?: boolean;
}

/**
 * A plain label rendered above a field, instead of using MUI's built-in
 * floating/notched label (which cuts a gap into the outlined border).
 *
 * That built-in mechanism measures the label text and cuts a matching gap
 * in the border's legend element — if that measurement is ever off (custom
 * web fonts, small/dense sizing, some Safari versions), the label ends up
 * overlapping the border instead of sitting inside a clean gap. Rendering
 * the label as ordinary text above the field sidesteps that mechanism
 * completely, so it can't happen regardless of font loading or browser.
 */
export function FieldLabel({ label, required }: FieldLabelProps) {
  return (
    <Typography
      component="label"
      sx={{
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: "text.secondary",
        mb: 0.75,
      }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: "secondary.main", ml: 0.5 }}>
          *
        </Box>
      )}
    </Typography>
  );
}
