import type {DbTable} from "../../common";
import {LANDSUBSEntity} from "../source/Database";

import {LandRecord} from "@models/entities/land-record";
import {type KeyMapper} from "../../transformers";


export const landRecordMapper: KeyMapper<LandRecord, LANDSUBSEntity> = {
  id: 'LANDKEY',
  property_id: 'REALKEY',
  description: 'DESCRIP',
  type: 'SUB_TYPE',
  value_method: 'LANDMETHOD',
  acres: 'ACRES',
  square_feet: 'SQUAREFEET',
  frontage: 'FRONTFEET',
  effective_frontage: 'EFF_FRONT',
  depth: 'TOTALDEPTH',
  lots: 'LOTS',
  influence_factor: 'SUBRECINFL',
}


export const landRecord: DbTable = {
  name: 'LANDSUBS',
  primaryKey: 'LANDKEY',
  columns: [
    'id',
    'name',
    'description',
    'created_at',
    'updated_at',
  ],
}



