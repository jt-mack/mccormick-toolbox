export function tryParseInt(value: number| string | undefined): number | undefined {
  if (value) {
    if (typeof value === 'number') {
      return value;
    }
    const parsed = parseInt(value);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

export function tryParseFloat(value: number | string | undefined): number | undefined {
  if (value) {
    if (typeof value === 'number') {
      return value;
    }
    const parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

export function formatNumber(value: number | string | undefined): string {
  value=tryParseInt(value);
  return value ? value?.toLocaleString():'';
}

export function formatDecimal(value: number |string | undefined): string {
  value=tryParseFloat(value)
  return value? value?.toFixed(2):'';
}