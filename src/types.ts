// Core types for the schema-driven multi-step form engine.
// A form is described entirely as data (FormSchema) — no per-field JSX
// needs to be hand-written to add, remove, or reorder fields.

export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "repeater";

export interface SelectOption {
  label: string;
  value: string;
}

/**
 * A condition that determines whether a field (or repeater sub-field) is
 * shown. Evaluated against the live form values every render.
 */
export interface FieldCondition {
  /** Name of the field this condition depends on */
  field: string;
  /** Value(s) that satisfy the condition */
  equals?: string | boolean;
  in?: (string | boolean)[];
}

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: SelectOption[]; // for select / radio
  /** Only render this field when the condition evaluates true */
  showIf?: FieldCondition;
  /** For "repeater" fields: the shape of each repeated row */
  fields?: FieldDefinition[];
  /** Max repeated rows for "repeater" fields */
  maxRows?: number;
  /** Min characters (text/textarea) */
  minLength?: number;
}

export interface StepDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FieldDefinition[];
}

export interface FormSchema {
  title: string;
  subtitle?: string;
  steps: StepDefinition[];
}
