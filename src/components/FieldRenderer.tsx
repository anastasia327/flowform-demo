import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { FieldDefinition } from "../types";
import { isConditionMet } from "../utils/conditions";
import { RepeaterField } from "./RepeaterField";
import { FieldLabel } from "./FieldLabel";

interface FieldRendererProps {
  field: FieldDefinition;
  control: Control<any>;
  errors: FieldErrors<any>;
  watchedValues: Record<string, any>;
  namePrefix?: string;
}

function getNestedError(errors: FieldErrors<any>, path: string) {
  return path.split(".").reduce<any>((acc, key) => (acc ? acc[key] : undefined), errors);
}

export function FieldRenderer({
  field,
  control,
  errors,
  watchedValues,
  namePrefix = "",
}: FieldRendererProps) {
  const name = namePrefix ? `${namePrefix}.${field.name}` : field.name;

  if (!isConditionMet(field.showIf, watchedValues)) {
    return null;
  }

  if (field.type === "repeater") {
    return (
      <RepeaterField
        field={field}
        control={control}
        errors={errors}
        watchedValues={watchedValues}
        name={name}
      />
    );
  }

  const fieldError = getNestedError(errors, name);
  const errorMessage = fieldError?.message as string | undefined;

  if (field.type === "checkbox") {
    // Checkboxes use an inline label to their right — not affected by the
    // outlined-border notch issue — so no change needed here.
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: rhfField }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!rhfField.value}
                onChange={(e) => rhfField.onChange(e.target.checked)}
              />
            }
            label={field.label}
          />
        )}
      />
    );
  }

  if (field.type === "select") {
    return (
      <Box>
        <FieldLabel label={field.label} required={field.required} />
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              select
              fullWidth
              error={!!errorMessage}
              helperText={errorMessage || field.helperText}
            >
              <MenuItem value="">
                <em>Select…</em>
              </MenuItem>
              {(field.options || []).map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    );
  }

  if (field.type === "radio") {
    // FormLabel here already sits above the RadioGroup (not inside a
    // notched border), so it's unaffected — kept as-is.
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: rhfField }) => (
          <FormControl error={!!errorMessage} component="fieldset">
            <FieldLabel label={field.label} required={field.required} />
            <RadioGroup {...rhfField} row>
              {(field.options || []).map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
            {(errorMessage || field.helperText) && (
              <FormHelperText>{errorMessage || field.helperText}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    );
  }

  // text / email / textarea / date all render as a plain (unlabeled)
  // TextField, with FieldLabel placed above it.
  return (
    <Box>
      <FieldLabel label={field.label} required={field.required} />
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: rhfField }) => (
          <TextField
            {...rhfField}
            fullWidth
            type={field.type === "date" ? "date" : field.type === "email" ? "email" : "text"}
            placeholder={field.placeholder}
            multiline={field.type === "textarea"}
            minRows={field.type === "textarea" ? 3 : undefined}
            error={!!errorMessage}
            helperText={errorMessage || field.helperText}
          />
        )}
      />
    </Box>
  );
}
