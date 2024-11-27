export function formatNumber(value: number | string): string {
  return value?.toLocaleString();
}

export function formatDecimal(value: number | string): string {
  return value?.toFixed(2);
}