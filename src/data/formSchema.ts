import { FormSchema } from "../types";

/**
 * Example schema: a client onboarding form.
 * Swap this file for your own schema — nothing else in the kit needs to change.
 */
export const clientOnboardingSchema: FormSchema = {
  title: "Client Onboarding",
  subtitle: "Tell us about the engagement so we can scope it correctly.",
  steps: [
    {
      id: "contact",
      title: "Contact details",
      description: "Who are we speaking with?",
      fields: [
        {
          name: "fullName",
          label: "Full name",
          type: "text",
          required: true,
          minLength: 2,
          placeholder: "Jane Papadopoulou",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          placeholder: "jane@company.com",
        },
        {
          name: "phone",
          label: "Phone",
          type: "text",
          placeholder: "+30 69X XXX XXXX",
        },
      ],
    },
    {
      id: "business",
      title: "Business details",
      description: "Only shown when the client represents a company.",
      fields: [
        {
          name: "representsBusiness",
          label: "I'm submitting this on behalf of a business",
          type: "checkbox",
        },
        {
          name: "companyName",
          label: "Company name",
          type: "text",
          required: true,
          showIf: { field: "representsBusiness", equals: true },
        },
        {
          name: "vatNumber",
          label: "VAT number",
          type: "text",
          showIf: { field: "representsBusiness", equals: true },
        },
        {
          name: "companySize",
          label: "Company size",
          type: "select",
          showIf: { field: "representsBusiness", equals: true },
          options: [
            { label: "1–10 employees", value: "1-10" },
            { label: "11–50 employees", value: "11-50" },
            { label: "51–200 employees", value: "51-200" },
            { label: "200+ employees", value: "200+" },
          ],
        },
      ],
    },
    {
      id: "services",
      title: "Services needed",
      description: "Add one row per service. You can add up to 5.",
      fields: [
        {
          name: "services",
          label: "Requested services",
          type: "repeater",
          maxRows: 5,
          fields: [
            {
              name: "service",
              label: "Service",
              type: "select",
              required: true,
              options: [
                { label: "Front-end development", value: "frontend" },
                { label: "Mobile app (Capacitor)", value: "mobile" },
                { label: "UI / component kit", value: "ui-kit" },
                { label: "Consulting", value: "consulting" },
              ],
            },
            {
              name: "hoursEstimate",
              label: "Estimated hours",
              type: "text",
              placeholder: "e.g. 20",
            },
            {
              name: "notes",
              label: "Notes",
              type: "textarea",
            },
          ],
        },
      ],
    },
  ],
};
