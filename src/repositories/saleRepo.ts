import {useIpcLoader} from "../composables";
import {PropertySale, PropertyWithSale, Lookup} from "@models/entities";

const {isLoading, callIpc} = useIpcLoader();

export function useSaleRepo() {
  const getSalesByLandCode = async (id: number, years: number[],sale_codes:Lookup[]): Promise<PropertySale[]> => {
    try {
      const result = await callIpc('sales:land_code', [id, years, sale_codes]);
      return result;
    } catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  const getSalesWithPropertyByLandCode = async (id: string, years: number[], sale_codes:Lookup[]): Promise<PropertyWithSale[]> => {
    try {
      const result = await callIpc('sales_properties:land_code', [id, years, sale_codes]);
      return result;
    } catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  const getSalesCodes = async (): Promise<Lookup[]> => {
    try {
      const result = await callIpc('sales:codes');
      return result;
    } catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  return {
    getSalesByLandCode,
    getSalesWithPropertyByLandCode,
    getSalesCodes,
  }
}