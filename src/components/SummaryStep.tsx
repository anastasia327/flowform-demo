import React from "react";
import { Box, Typography, Stack, Divider, Button, Paper, Chip } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { FormSchema, FieldDefinition } from "../types";
import { isConditionMet } from "../utils/conditions";
import { exportFormToPdf } from "../utils/pdfExport";
import { monoFont } from "../theme";

interface SummaryStepProps {
  schema: FormSchema;
  values: Record<string, any>;
  submitted: boolean;
}

function formatValue(field: FieldDefinition, value: any): string {
  if (value === undefined || value === null || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (field.type === "select" || field.type === "radio") {
    const match = field.options?.find((o) => o.value === value);
    return match ? match.label : String(value);
  }
  return String(value);
}

export function SummaryStep({ schema, values, submitted }: SummaryStepProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Review &amp; submit
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Check the details below, then submit or export a PDF copy.
      </Typography>

      <Stack spacing={3}>
        {schema.steps.map((step) => (
          <Box key={step.id}>
            <Typography
              sx={{ fontFamily: monoFont, fontSize: 11, color: "secondary.main", mb: 1 }}
            >
              {step.title.toUpperCase()}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1.2}>
                {step.fields.map((field) => {
                  if (!isConditionMet(field.showIf, values)) return null;

                  if (field.type === "repeater") {
                    const rows: Record<string, any>[] = values[field.name] || [];
                    return (
                      <Box key={field.name}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {field.label} ({rows.length})
                        </Typography>
                        {rows.length === 0 && (
                          <Typography variant="caption" color="text.secondary">
                            No rows added.
                          </Typography>
                        )}
                        <Stack spacing={1}>
                          {rows.map((row, i) => (
                            <Box key={i} sx={{ pl: 1.5, borderLeft: "2px solid", borderColor: "divider" }}>
                              {(field.fields || []).map((sub) => (
                                <Typography key={sub.name} variant="caption" display="block" color="text.secondary">
                                  {sub.label}: {formatValue(sub, row[sub.name])}
                                </Typography>
                              ))}
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    );
                  }

                  return (
                    <Stack direction="row" justifyContent="space-between" key={field.name}>
                      <Typography variant="body2" color="text.secondary">
                        {field.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right" }}>
                        {formatValue(field, values[field.name])}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </Paper>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfOutlinedIcon />}
          onClick={() => exportFormToPdf(schema, values)}
        >
          Export as PDF
        </Button>
        {submitted && (
          <Chip
            icon={<CheckCircleOutlineIcon />}
            label="Submitted"
            color="secondary"
            variant="outlined"
          />
        )}
      </Stack>
    </Box>
  );
}
