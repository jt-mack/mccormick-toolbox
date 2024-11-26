import type {DbTable} from "../../common";
import {SUBDIVISEntity} from "../source/Database";

import {LandClassification} from "@models/entities/land-classification";
import { type KeyMapper} from "../../transformers.ts";


export const landClassMapper:KeyMapper<LandClassification, SUBDIVISEntity>={
  id:'SUBDIVCODE',
  description:'SUBDIVNAME',
  method:'CALCMETHOD',
  base_rate:'UNITVALUE',
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



