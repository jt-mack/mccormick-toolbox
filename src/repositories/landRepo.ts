import type {LandClassification} from '@models/entities/land-classification'

import {useIpcLoader} from "../composables";

const {isLoading, callIpc} = useIpcLoader();

export function useLandRepo() {
  const getEntities = async (): Promise<LandClassification[]> => {
    try {
      // const result= await window.electronAPI.query(`select SUBDIVCODE as 'id', SUBDIVNAME as 'description', CALCMETHOD as 'method' from SUBDIVIS;`);
      const result = await callIpc('land-class:all');
      return result;
    } catch (e) {
      console.error('Error fetching entities:', e);
      return [];
    }
  }

  const getLandClass = async (id: string): Promise<LandClassification> => {
    try {
      const result = await callIpc('land-class:id', id);
      console.log({result});
      return result;
    } catch (e) {
      console.error('Error fetching entity:', e);
      return Promise.reject(e);
    }
  }

  return {
    getEntities,
    getLandClass,
  }
}