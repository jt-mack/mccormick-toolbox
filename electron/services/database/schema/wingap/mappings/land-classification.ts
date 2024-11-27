import type {DbTable} from "../../common";
import {SUBDIVISEntity} from "../source/Database";

import {LandClassification} from "@models/entities/land-classification";
import { type KeyMapper} from "../../transformers.ts";

export const landMethodLookup=(land_method:number):string=>{
  switch (land_method) {
    case 1:
      return 'Front Foot'
    case 2:
      return 'Acre'
    case 3:
      return 'Square Feet'
    case 4:
      return 'Lot'
    default:
      return 'Unknown'
  }
}

export const landClassMapper:KeyMapper<LandClassification, SUBDIVISEntity>={
  id:'SUBDIVCODE',
  description:'SUBDIVNAME',
  method:'CALCMETHOD',
  base_rate:'UNITVALUE',
  base_rate_breakpoint:'EXUNITS',
  base_rate_breakpoint_adjustment:'EXFACTOR'
}


export const landClassification: DbTable = {
  name: 'SUBDIVIS',
  primaryKey: 'SUBDIVCODE',
  columns: [
    'id',
    'name',
    'description',
    'created_at',
    'updated_at',
  ],
}



