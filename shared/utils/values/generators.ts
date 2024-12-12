import type {Property, LandClassification, PropertyWithSale, LandRecord} from "@models/entities";
import {calculateMedian,average, groupBy} from "../arrayHelpers";

import {tryParseFloat,tryParseInt} from "@/utils";

/**
 * Generate a base cost schedule for vacant land sales.
 * @param sales - List of sold properties.
 * @param properties - List of all properties (sold and unsold).
 * @returns The base cost schedule.
 */
export function generateBaseCostSchedule(
  sales: PropertyWithSale[],
  properties: LandRecord[],
  classification: LandClassification
): LandClassification | null {

  let unitType: keyof LandRecord = "acres";

  switch (classification.method) {
    case 2:
    default:
      unitType = "acres";
      break;
    case 4:
      unitType = "lots";
      break;
    case 1:
      unitType = "frontage";
      break;
  }

  properties=properties.map(p=>({...p, frontage: p.effective_frontage || p.frontage}));
  const salesWithLandRecords = sales.map((sale) => {
    const matchingRecord = properties.find((record) => record.property_id === sale.id);
    return {...sale, record: matchingRecord};
  })
  // // Group sales and properties by unit type
  // const salesGrouped = groupBy(sales, "unit");
  // const propertiesGrouped = groupBy(properties, "unit");

  // Adjust sale prices to reflect only the land value and back out any improvement values
  const adjustedSalesForLandValue = salesWithLandRecords.map((sale) => {

    let nonLandValues=[sale.residential_improvement_value,sale.commercial_improvement_value,sale.accessory_improvement_value];
    nonLandValues=nonLandValues.map(tryParseFloat).filter(x=>x);
    const nonLandPropertyValue=nonLandValues.reduce((sum:number,val=0)=>sum+val,0);

    let adjustedForImprovements=sale.adjusted_sale_price - nonLandPropertyValue;
    if(adjustedForImprovements<0){
      adjustedForImprovements=0;
    }
    return {...sale, adjusted_sale_price: sale.is_vacant || sale.sale_code=='LM' ? sale.adjusted_sale_price: adjustedForImprovements};
  }).filter(sale=>sale.adjusted_sale_price>0);

  if (adjustedSalesForLandValue.length === 0) {
    return null;
    // throw new Error(`No sales data available for unit: ${unit}`);
  }

  // Calculate base unit value using sales within the breakpoint range
  const unitValues = salesWithLandRecords.map((sale) => sale.adjusted_sale_price / (sale.record?.[unitType] ?? 0));

  // Calculate the median units from all properties (sold + unsold) for the breakpoint
  const allUnits = properties.map((property) => property[unitType] as number).sort((a, b) => a - b);
  const breakpoint = calculateMedian(allUnits);

  // Separate sales within and beyond the breakpoint
  const salesWithinBreakpoint = adjustedSalesForLandValue.filter((sale) => (sale.record?.[unitType] ?? 0) <= breakpoint);
  const salesBeyondBreakpoint = adjustedSalesForLandValue.filter((sale) => (sale?.record?.[unitType] ?? 0) >= breakpoint);

  // Calculate the base unit value (average for sales within the breakpoint)
  let baseUnitValue = average(
    salesWithinBreakpoint.map((sale) => sale.adjusted_sale_price / (sale.record?.[unitType] ?? 0))
  );

  // Calculate the breakpoint factor using sales beyond the breakpoint
  let adjustmentFactor:number|null = 1; // Default to no adjustment
  if (salesBeyondBreakpoint.length > 0) {
    const averageBeyondBreakpoint = average(
      salesBeyondBreakpoint.map((sale) => sale.adjusted_sale_price / (sale.record?.[unitType] ?? 0))
    );
    const potentialAdjustmentFactor = averageBeyondBreakpoint / baseUnitValue;

    // Apply adjustment factor only if it's less than 1 (indicating a discount is needed)
    if (potentialAdjustmentFactor < 1) {
      adjustmentFactor = potentialAdjustmentFactor;
    } else {
      // Include sales beyond the breakpoint in the base unit value calculation
      baseUnitValue = average(
        unitValues
      );
    }
  }

  return {
    ...classification,
    base_rate: baseUnitValue,
    base_rate_breakpoint: breakpoint,
    base_rate_breakpoint_adjustment: adjustmentFactor,
  };
}




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
