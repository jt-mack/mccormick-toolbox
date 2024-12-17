import type {PropertyWithSale, SalesRatio, SalesRatioType} from "@models/entities";

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
export function calculateMedianRatio(sales: PropertyWithSale[], ratioType:SalesRatioType): number {
  const ratios = sales.map(sale => (sale.current_value * ratioType) / sale.adjusted_sale_price);
  return calculateMedian(ratios);
}

// Function to calculate the Coefficient of Dispersion (COD)
export function calculateCOD(sales: PropertyWithSale[], medianRatio: number, ratioType:SalesRatioType): number {
  const absoluteDeviations = sales.map(sale => {
    const ratio = (sale.current_value *ratioType)/ sale.adjusted_sale_price;
    return Math.abs(ratio - medianRatio);
  });

  const meanAbsoluteDeviation = absoluteDeviations.reduce((sum, dev) => sum + dev, 0) / absoluteDeviations.length;
  return (meanAbsoluteDeviation / medianRatio) * 100;
}

// Function to calculate the Price-Related Differential (PRD)
export function calculatePRD(sales: PropertyWithSale[], ratioType:SalesRatioType): number {
  const ratios = sales.map(sale => (sale.current_value * ratioType) / sale.adjusted_sale_price);

  const meanRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
  const weightedMeanRatio = sales.reduce((sum, sale) => sum + (sale.current_value * ratioType), 0) /
    sales.reduce((sum, sale) => sum + sale.adjusted_sale_price, 0);

  return +(meanRatio / weightedMeanRatio).toString().split("e")[0];
}

// Function to identify sales outside confidence intervals
export function identifyConfidenceIntervalsAndOutliers(sales: PropertyWithSale[], medianRatio: number, cod: number, ratioType:SalesRatioType) {
  const lowerLimit = medianRatio * (1 - cod / 100);
  const upperLimit = medianRatio * (1 + cod / 100);

  const outliers = sales.filter(sale => {
    const ratio = (sale.current_value  * ratioType)/ sale.adjusted_sale_price;
    return ratio < lowerLimit || ratio > upperLimit;
  });

  return { lowerLimit, upperLimit, outliers };
}

// Main function to calculate all sales ratio statistics
export function calculateSalesRatio(sales: PropertyWithSale[], ratioType:SalesRatioType):SalesRatio|null {
  if (sales.length === 0) return null;

  const medianRatio = calculateMedianRatio(sales, ratioType);
  const cod = calculateCOD(sales, medianRatio, ratioType);
  const prd = calculatePRD(sales, ratioType);
  const { lowerLimit, upperLimit, outliers } = identifyConfidenceIntervalsAndOutliers(sales, medianRatio, cod, ratioType);

  return { count:sales.length,medianRatio, cod, prd, lowerLimit,upperLimit,outliers };
}

