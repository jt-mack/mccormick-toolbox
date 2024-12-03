/**
 * Utility function to calculate the average of a list of numbers.
 */
export function average(values: number[]): number {
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Utility function to calculate the median of a list of numbers.
 */
export function calculateMedian(values: number[]): number {
  const mid = Math.floor(values.length / 2);
  return values.length % 2 === 0
    ? (values[mid - 1] + values[mid]) / 2
    : values[mid];
}

/**
 * Utility function to group objects by a key.
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const keyValue = item[key] as string;
    if (!acc[keyValue]) {
      acc[keyValue] = [];
    }
    acc[keyValue].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}