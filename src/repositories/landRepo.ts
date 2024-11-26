import type { LandClassification } from '@models/entities/land-classification'

import {useIpcLoader} from "../composables";

const {isLoading, callIpc} = useIpcLoader();

export function useLandRepo() {
  const getEntities = async (): Promise<LandClassification[]> => {
    try {// In a real implementation, this would query the MSSQL database
      // const result= await window.electronAPI.query(`select SUBDIVCODE as 'id', SUBDIVNAME as 'description', CALCMETHOD as 'method' from SUBDIVIS;`);
      const result= await callIpc('land-class:all');
      console.log({result});
      return result;
      // return [
      //   {id: 1, description: "Agricultural Land Plot A", method: 1},
      //   {id: 2, description: "Commercial Property Zone B", method: 2},
      //   {id: 3, description: "Residential Area Plot C", method: 1},
      //   {id: 4, description: "Industrial Zone Plot D", method: 3},
      //   {id: 5, description: "Mixed-Use Development E", method: 2},
      //   {id: 6, description: "Urban Settlement F", method: 1},
      //   {id: 7, description: "Rural Development G", method: 2},
      //   {id: 8, description: "Conservation Area H", method: 3},
      //   {id: 9, description: "Business District I", method: 1},
      //   {id: 10, description: "Suburban Zone J", method: 2},
      // ]
    }
    catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  return {
    getEntities
  }
}