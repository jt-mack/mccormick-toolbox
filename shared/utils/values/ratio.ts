import type {PropertyWithSale, SalesRatio} from "@models/entities";

// Function to calculate the median of an array of numbers
export function calculateMedian(values: number[]): number {
  if (values.length === 0) throw new Error("No values provided for median calculation.");
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

// Function to calculate the median ratio
export function calculateMedianRatio(sales: PropertyWithSale[]): number {
  const ratios = sales.map(sale => sale.current_value / sale.adjusted_sale_price);
  return calculateMedian(ratios);
}

// Function to calculate the Coefficient of Dispersion (COD)
export function calculateCOD(sales: PropertyWithSale[], medianRatio: number): number {
  const absoluteDeviations = sales.map(sale => {
    const ratio = sale.current_value / sale.adjusted_sale_price;
    return Math.abs(ratio - medianRatio);
  });

  const meanAbsoluteDeviation = absoluteDeviations.reduce((sum, dev) => sum + dev, 0) / absoluteDeviations.length;
  return (meanAbsoluteDeviation / medianRatio) * 100;
}

// Function to calculate the Price-Related Differential (PRD)
export function calculatePRD(sales: PropertyWithSale[]): number {
  const ratios = sales.map(sale => sale.current_value / sale.adjusted_sale_price);

  const meanRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
  const weightedMeanRatio = sales.reduce((sum, sale) => sum + sale.current_value, 0) /
    sales.reduce((sum, sale) => sum + sale.adjusted_sale_price, 0);

  return meanRatio / weightedMeanRatio;
}

// Main function to calculate all sales ratio statistics
export function calculateSalesRatio(sales: PropertyWithSale[]):SalesRatio {
  if (sales.length === 0) throw new Error("No sales data provided.");

  const medianRatio = calculateMedianRatio(sales);
  const cod = calculateCOD(sales, medianRatio);
  const prd = calculatePRD(sales);

  return { count:sales.length,medianRatio, cod, prd };
}

