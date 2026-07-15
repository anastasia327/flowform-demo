import { FieldCondition } from "../types";

export function isConditionMet(
  condition: FieldCondition | undefined,
  values: Record<string, any>
): boolean {
  if (!condition) return true;
  const currentValue = values[condition.field];
  if (condition.in) {
    return condition.in.includes(currentValue);
  }
  return currentValue === condition.equals;
}
