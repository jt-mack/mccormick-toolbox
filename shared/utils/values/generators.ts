// type LandSale = {
//   unit: "acre" | "lot" | "front feet";
//   units: number; // Number of units (e.g., acres, lots, or front feet)
//   salePrice: number; // Total sale price
// };
//
// type Property = {
//   unit: "acre" | "lot" | "front feet";
//   units: number; // Number of units
// };
//
// type BaseCostSchedule = {
//   unit: "acre" | "lot" | "front feet";
//   unitValue: number; // Value per unit
//   breakpoint: number; // Units triggering the breakpoint
//   adjustmentFactor: number; // Multiplier for units beyond the breakpoint
// };
//
// /**
//  * Generate a base cost schedule for vacant land sales.
//  * @param sales - List of sold properties.
//  * @param properties - List of all properties (sold and unsold).
//  * @returns The base cost schedule.
//  */
// function generateBaseCostSchedule(
//   sales: LandSale[],
//   properties: Property[]
// ): BaseCostSchedule[] {
//   // Group sales and properties by unit type
//   const salesGrouped = groupBy(sales, "unit");
//   const propertiesGrouped = groupBy(properties, "unit");
//
//   // Generate cost schedule for each unit type
//   const schedule: BaseCostSchedule[] = Object.keys(propertiesGrouped).map((unit) => {
//     const salesForUnit = salesGrouped[unit] || [];
//     const propertiesForUnit = propertiesGrouped[unit];
//
//     if (salesForUnit.length === 0) {
//       throw new Error(`No sales data available for unit: ${unit}`);
//     }
//
//     // Calculate base unit value using sales within the breakpoint range
//     const unitValues = salesForUnit.map((sale) => sale.salePrice / sale.units);
//
//     // Calculate the median units from all properties (sold + unsold) for the breakpoint
//     const allUnits = propertiesForUnit.map((property) => property.units).sort((a, b) => a - b);
//     const breakpoint = calculateMedian(allUnits);
//
//     // Separate sales within and beyond the breakpoint
//     const salesWithinBreakpoint = salesForUnit.filter((sale) => sale.units <= breakpoint);
//     const salesBeyondBreakpoint = salesForUnit.filter((sale) => sale.units > breakpoint);
//
//     // Calculate the base unit value (average for sales within the breakpoint)
//     const baseUnitValue = average(
//       salesWithinBreakpoint.map((sale) => sale.salePrice / sale.units)
//     );
//
//     // Calculate the breakpoint factor using sales beyond the breakpoint
//     let adjustmentFactor = 1; // Default to no adjustment
//     if (salesBeyondBreakpoint.length > 0) {
//       const averageBeyondBreakpoint = average(
//         salesBeyondBreakpoint.map((sale) => sale.salePrice / sale.units)
//       );
//       adjustmentFactor = averageBeyondBreakpoint / baseUnitValue;
//     }
//
//     return {
//       unit: unit as "acre" | "lot" | "front feet",
//       unitValue: baseUnitValue,
//       breakpoint,
//       adjustmentFactor,
//     };
//   });
//
//   return schedule;
// }
//
// /**
//  * Utility function to calculate the average of a list of numbers.
//  */
// function average(values: number[]): number {
//   return values.reduce((sum, val) => sum + val, 0) / values.length;
// }
//
// /**
//  * Utility function to calculate the median of a list of numbers.
//  */
// function calculateMedian(values: number[]): number {
//   const mid = Math.floor(values.length / 2);
//   return values.length % 2 === 0
//     ? (values[mid - 1] + values[mid]) / 2
//     : values[mid];
// }
//
// /**
//  * Utility function to group objects by a key.
//  */
// function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
//   return array.reduce((acc, item) => {
//     const keyValue = item[key] as string;
//     if (!acc[keyValue]) {
//       acc[keyValue] = [];
//     }
//     acc[keyValue].push(item);
//     return acc;
//   }, {} as Record<string, T[]>);
// }
//
// // Example usage
// const sales: LandSale[] = [
//   { unit: "acre", units: 1, salePrice: 10000 },
//   { unit: "acre", units: 5, salePrice: 45000 },
//   { unit: "acre", units: 10, salePrice: 80000 },
//   { unit: "lot", units: 3, salePrice: 90000 },
// ];
//
// const properties: Property[] = [
//   { unit: "acre", units: 1 },
//   { unit: "acre", units: 5 },
//   { unit: "acre", units: 10 },
//   { unit: "acre", units: 15 },
//   { unit: "lot", units: 3 },
//   { unit: "lot", units: 6 },
// ];
//
// const schedule = generateBaseCostSchedule(sales, properties);
// console.log(schedule);
