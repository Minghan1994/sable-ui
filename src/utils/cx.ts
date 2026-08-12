export type ClassValue = string | number | false | null | undefined;

/** Joins truthy class names. Deliberately tiny — the library ships no classname dependency. */
export function cx(...values: ClassValue[]): string {
  let result = '';
  for (const value of values) {
    if (!value && value !== 0) continue;
    result = result ? `${result} ${value}` : String(value);
  }
  return result;
}
