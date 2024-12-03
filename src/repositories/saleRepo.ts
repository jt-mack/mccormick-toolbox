
import {useIpcLoader} from "../composables";
import {PropertySale, PropertyWithSale} from "@models/entities";

const {isLoading, callIpc} = useIpcLoader();

export function useSaleRepo() {
  const getSalesByLandCode = async (id:number,years:number[]): Promise<PropertySale[]> => {
    try {
      const result = await callIpc('sales:land_code', [id, years]);
      return result;
    } catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  const getSalesWithPropertyByLandCode = async (id:string,years:number[]): Promise<PropertyWithSale[]> => {
    try {
      const result = await callIpc('sales_properties:land_code', [id, years]);
      return result;
    } catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  return {
   getSalesByLandCode,
    getSalesWithPropertyByLandCode,
  }
}