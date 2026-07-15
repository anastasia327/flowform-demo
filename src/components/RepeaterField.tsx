import React from "react";
import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import { Box, Button, IconButton, Paper, Stack, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FieldDefinition } from "../types";
import { FieldRenderer } from "./FieldRenderer";
import { monoFont } from "../theme";

interface RepeaterFieldProps {
  field: FieldDefinition;
  control: Control<any>;
  errors: FieldErrors<any>;
  watchedValues: Record<string, any>;
  name: string;
}

export function RepeaterField({ field, control, errors, watchedValues, name }: RepeaterFieldProps) {
  const { fields, append, remove } = useFieldArray({ control, name });

  const emptyRow: Record<string, any> = {};
  (field.fields || []).forEach((f) => {
    emptyRow[f.name] = f.type === "checkbox" ? false : "";
  });

  const atMax = field.maxRows ? fields.length >= field.maxRows : false;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {field.label}
        </Typography>
        <Typography sx={{ fontFamily: monoFont, fontSize: 12, color: "text.secondary" }}>
          {fields.length}
          {field.maxRows ? ` / ${field.maxRows}` : ""}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {fields.map((rowField, index) => (
          <Paper
            key={rowField.id}
            variant="outlined"
            sx={{ p: 2, borderColor: "divider", position: "relative" }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography
                sx={{ fontFamily: monoFont, fontSize: 12, color: "secondary.main", mb: 1 }}
              >
                ROW {String(index + 1).padStart(2, "0")}
              </Typography>
              <IconButton
                size="small"
                onClick={() => remove(index)}
                aria-label={`Remove row ${index + 1}`}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {(field.fields || []).map((subField) => (
                <FieldRenderer
                  key={subField.name}
                  field={subField}
                  control={control}
                  errors={errors}
                  watchedValues={watchedValues}
                  namePrefix={`${name}.${index}`}
                />
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Button
        startIcon={<AddIcon />}
        onClick={() => append(emptyRow)}
        disabled={atMax}
        sx={{ mt: 2 }}
        variant="outlined"
        size="small"
      >
        Add row
      </Button>
    </Box>
  );
}
