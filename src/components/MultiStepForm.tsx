import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Stack, Typography, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FormSchema } from "../types";
import { buildStepSchema } from "../utils/validation";
import { StepperHeader } from "./StepperHeader";
import { FieldRenderer } from "./FieldRenderer";
import { SummaryStep } from "./SummaryStep";
import { monoFont } from "../theme";

interface MultiStepFormProps {
  schema: FormSchema;
}

export function MultiStepForm({ schema }: MultiStepFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const allFields = useMemo(
    () => schema.steps.flatMap((s) => s.fields),
    [schema]
  );
  const combinedSchema = useMemo(() => buildStepSchema(allFields), [allFields]);

  const {
    control,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(combinedSchema),
    mode: "onBlur",
  });

  const watchedValues = watch();
  const isReviewStep = activeStep === schema.steps.length;
  const stepperSteps = [...schema.steps, { id: "review", title: "Review & submit" }];

  const handleNext = async () => {
    if (isReviewStep) {
      setSubmitted(true);
      return;
    }
    const currentStep = schema.steps[activeStep];
    const fieldNames = currentStep.fields.map((f) => f.name);
    const valid = await trigger(fieldNames as any);
    if (valid) {
      setActiveStep((s) => s + 1);
    }
  };

  const handleBack = () => setActiveStep((s) => Math.max(0, s - 1));

  return (
    <Paper
      variant="outlined"
      sx={{ maxWidth: 880, mx: "auto", overflow: "hidden", borderColor: "divider" }}
    >
      <Box sx={{ p: { xs: 3, sm: 5 }, bgcolor: "primary.main", color: "#fff" }}>
        <Typography sx={{ fontFamily: monoFont, fontSize: 12, opacity: 0.7, mb: 1 }}>
          FLOWFORM · SCHEMA-DRIVEN
        </Typography>
        <Typography variant="h4" sx={{ fontSize: { xs: 24, sm: 30 } }}>
          {schema.title}
        </Typography>
        {schema.subtitle && (
          <Typography sx={{ opacity: 0.75, mt: 1, maxWidth: 480 }}>{schema.subtitle}</Typography>
        )}
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} sx={{ p: { xs: 3, sm: 5 } }} spacing={5}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <StepperHeader steps={stepperSteps} activeIndex={activeStep} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {!isReviewStep ? (
            <>
              <Typography variant="h6">{schema.steps[activeStep].title}</Typography>
              {schema.steps[activeStep].description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {schema.steps[activeStep].description}
                </Typography>
              )}
              <Stack spacing={2.5} sx={{ mt: 3 }}>
                {schema.steps[activeStep].fields.map((field) => (
                  <FieldRenderer
                    key={field.name}
                    field={field}
                    control={control}
                    errors={errors}
                    watchedValues={watchedValues}
                  />
                ))}
              </Stack>
            </>
          ) : (
            <SummaryStep schema={schema} values={getValues()} submitted={submitted} />
          )}

          <Divider sx={{ my: 4 }} />

          <Stack direction="row" justifyContent="space-between">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              endIcon={!isReviewStep ? <ArrowForwardIcon /> : undefined}
              onClick={handleNext}
              disabled={isReviewStep && submitted}
            >
              {isReviewStep ? (submitted ? "Submitted" : "Submit") : "Continue"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
