import * as yup from "yup";
import { FieldDefinition } from "../types";

/**
 * Builds a yup validation schema for a single step (or repeater row) from
 * its field definitions. Conditional fields (showIf) are only required when
 * their condition is satisfied, using yup's `.when()`.
 */
export function buildStepSchema(fields: FieldDefinition[]): yup.ObjectSchema<any> {
  const shape: Record<string, yup.AnySchema> = {};

  fields.forEach((field) => {
    shape[field.name] = buildFieldSchema(field);
  });

  return yup.object(shape);
}

function buildFieldSchema(field: FieldDefinition): yup.AnySchema {
  let schema: yup.AnySchema;

  switch (field.type) {
    case "checkbox":
      schema = yup.boolean().default(false);
      break;

    case "repeater": {
      const rowSchema = field.fields ? buildStepSchema(field.fields) : yup.object();
      let arraySchema = yup.array().of(rowSchema).default([]);
      if (field.maxRows) {
        arraySchema = arraySchema.max(
          field.maxRows,
          `You can add up to ${field.maxRows} rows.`
        );
      }
      schema = arraySchema;
      break;
    }

    case "email": {
      let s = yup.string().email("Enter a valid email address");
      schema = applyRequired(s, field);
      break;
    }

    default: {
      let s = yup.string();
      if (field.minLength) {
        s = s.min(field.minLength, `${field.label} must be at least ${field.minLength} characters`);
      }
      schema = applyRequired(s, field);
      break;
    }
  }

  // Conditional requirement: if the field only appears when another field
  // has a given value, only enforce its base schema in that case —
  // otherwise it's optional regardless of the base schema above.
  if (field.showIf) {
    const { field: dependsOn, equals, in: inList } = field.showIf;
    const isMatch = (val: any) =>
      inList ? inList.includes(val) : val === equals;

    const baseSchema = schema;

    schema = yup.mixed().when(dependsOn as any, {
      is: (val: any) => isMatch(val),
      then: () => baseSchema,
      otherwise: (s: any) => s.notRequired().nullable(),
    }) as unknown as yup.AnySchema;
  }

  return schema;
}

function applyRequired(schema: yup.StringSchema, field: FieldDefinition): yup.AnySchema {
  if (field.required) {
    return schema.required(`${field.label} is required`);
  }
  return schema.notRequired();
}
