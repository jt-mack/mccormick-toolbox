
import {useIpcLoader} from "../composables";
import {PropertySale} from "@models/entities";

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

  return {
   getSalesByLandCode,
  }
}