# FlowForm — Multi-Step Form Kit (React)

A schema-driven multi-step form kit for React. Define your form as data —
steps, fields, conditional logic and repeatable rows — and the kit renders,
validates and exports it. No per-field JSX to hand-write.

## Features

- **Schema-driven** — the entire form (steps, fields, validation) lives in
  one config object (`src/data/formSchema.ts`). Add a field by adding an
  entry, not by writing a new component.
- **Conditional fields** — show/hide any field based on another field's
  value (`showIf`).
- **Repeatable rows** — "add another" sections (e.g. line items, services)
  with per-row validation, powered by `react-hook-form`'s `useFieldArray`.
- **Validation** — built on `yup`, including conditional `required` rules
  that only apply when a field is actually visible.
- **PDF export** — turn the submitted values into a formatted PDF with one
  click (`jspdf`), including repeater rows.
- **MUI-based UI** — clean, accessible components with a distinctive,
  non-default visual style (custom "ledger" stepper, restrained mono/sans
  type pairing).
- **TypeScript** throughout.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Customizing the form

Everything about the demo form (a "client onboarding" example) lives in:

```
src/data/formSchema.ts
```

Change titles, add/remove steps, add fields, or wire up conditional logic
by editing this file only. Field types supported out of the box: `text`,
`email`, `textarea`, `select`, `radio`, `checkbox`, `date`, `repeater`.

To add a brand-new field *type* (e.g. file upload), extend:

- `src/types.ts` — add the type to `FieldType`
- `src/components/FieldRenderer.tsx` — add a render branch
- `src/utils/validation.ts` — add a yup schema branch

## Project structure

```
src/
  types.ts                  # Schema type definitions
  theme.ts                  # MUI theme (design tokens)
  data/formSchema.ts        # <- your form lives here
  utils/
    validation.ts           # Builds yup schema from field definitions
    conditions.ts           # Evaluates showIf conditions
    pdfExport.ts             # Renders submitted values to a PDF
  components/
    MultiStepForm.tsx       # Orchestrator: steps, navigation, submit
    StepperHeader.tsx       # Signature "ledger" step indicator
    FieldRenderer.tsx       # Renders one field by type
    RepeaterField.tsx       # Renders a repeatable row group
    SummaryStep.tsx         # Review screen + PDF export button
```

## License

Regular License: for use in a single end product, where end users are not
charged for access to the product. See your marketplace purchase terms for
the exact license text that applies to your download.

---

## Listing copy (for your own reference when publishing)

**Title:** FlowForm — Schema-Driven Multi-Step Form Kit for React

**Short description:**
Build multi-step forms from a single config file — conditional fields,
repeatable rows, validation and one-click PDF export included. React +
TypeScript + MUI.

**Bullet points:**
- Define forms as data, not JSX — add a field in seconds
- Conditional logic: show/hide fields based on other answers
- Repeatable field groups (add/remove rows) with per-row validation
- Built-in yup validation, including conditional "required" rules
- Export any submission to a formatted PDF in one click
- Clean, accessible MUI-based UI with a distinctive visual style
- Fully typed with TypeScript
- Well-documented, easy to extend with new field types

**Tags:** react, form builder, multi-step form, wizard, typescript,
material-ui, validation, pdf export, conditional logic, form kit
