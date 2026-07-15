import jsPDF from "jspdf";
import { FormSchema, FieldDefinition } from "../types";
import { isConditionMet } from "./conditions";

const MARGIN = 48;
const LINE_HEIGHT = 16;
const PAGE_HEIGHT = 780;

export function exportFormToPdf(schema: FormSchema, values: Record<string, any>) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let y = MARGIN;

  const ensureSpace = (lines = 1) => {
    if (y + lines * LINE_HEIGHT > PAGE_HEIGHT) {
      doc.addPage();
      y = MARGIN;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(schema.title, MARGIN, y);
  y += LINE_HEIGHT * 1.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(`Generated ${new Date().toLocaleString()}`, MARGIN, y);
  doc.setTextColor(0, 0, 0);
  y += LINE_HEIGHT * 1.5;

  schema.steps.forEach((step) => {
    ensureSpace(2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(step.title, MARGIN, y);
    y += LINE_HEIGHT * 1.3;

    step.fields.forEach((field) => {
      y = renderField(doc, field, values, MARGIN, y, ensureSpace);
    });

    y += LINE_HEIGHT * 0.5;
  });

  doc.save("submission.pdf");
}

function renderField(
  doc: jsPDF,
  field: FieldDefinition,
  values: Record<string, any>,
  x: number,
  y: number,
  ensureSpace: (lines?: number) => void
): number {
  if (!isConditionMet(field.showIf, values)) return y;

  if (field.type === "repeater") {
    ensureSpace(1);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(field.label, x, y);
    y += LINE_HEIGHT;

    const rows: Record<string, any>[] = values[field.name] || [];
    if (rows.length === 0) {
      ensureSpace(1);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("No rows added.", x + 12, y);
      y += LINE_HEIGHT;
      return y;
    }

    rows.forEach((row, index) => {
      ensureSpace(1);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`Row ${index + 1}`, x + 12, y);
      y += LINE_HEIGHT;

      (field.fields || []).forEach((subField) => {
        y = renderSimpleField(doc, subField, row, x + 24, y, ensureSpace);
      });
    });

    return y;
  }

  return renderSimpleField(doc, field, values, x, y, ensureSpace);
}

function renderSimpleField(
  doc: jsPDF,
  field: FieldDefinition,
  values: Record<string, any>,
  x: number,
  y: number,
  ensureSpace: (lines?: number) => void
): number {
  ensureSpace(1);
  const rawValue = values[field.name];
  const displayValue = formatValue(field, rawValue);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(`${field.label}:`, x, y);

  doc.setTextColor(20, 20, 20);
  doc.text(displayValue, x + 140, y);
  doc.setTextColor(0, 0, 0);

  return y + LINE_HEIGHT;
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
