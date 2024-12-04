import {defineStore} from 'pinia';
import {ref, watch} from "vue";
import {useLocalStorage, useSessionStorage} from "@vueuse/core";
import {useSaleRepo} from "../repositories/saleRepo.ts";
import type {Lookup} from '@models/entities';
import {FairMarketSales} from '@models/entities';


export const useSalesStore = defineStore('sales', () => {
  const salesRepo = useSaleRepo();

  const saleCodes = useSessionStorage<Lookup[]>('saleCodes', [], {
    serializer: {
      read: (v) => v ? JSON.parse(v).filter((v: string | null) => v).map((d: string) => new Date(d)) : null,
      write: (v) => JSON.stringify(v)
    }
  });

  const selectedSaleCodes = useLocalStorage<Lookup[]>('selectedSalesCodes', saleCodes.value?.filter(x => FairMarketSales.includes(x.code)) ?? [], {
    serializer: {
      read: (v) => v ? JSON.parse(v) : null,
      write: (v) => JSON.stringify(v)
    }
  });

  watch(() => saleCodes.value, async (val) => {
    if (!val.length) {
      try {
        const codes = await salesRepo.getSalesCodes();
        saleCodes.value = codes;
      } catch (e) {
        console.error('Error fetching sale codes:', e);
      }
    }
  }, {immediate: true});
  return {
    saleCodes,
    selectedSaleCodes,
  }
})