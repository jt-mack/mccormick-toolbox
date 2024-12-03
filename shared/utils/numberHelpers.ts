export function formatNumber(value: number | string | undefined): string {
  return value ? value?.toLocaleString():'';
}

export function formatDecimal(value: number  | undefined): string {
  return value? value?.toFixed(2):'';
}