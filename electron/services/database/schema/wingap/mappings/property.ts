import type {DbTable} from "../../common";
import {REALPROPEntity} from "../source/Database";

import {Property} from "@models/entities/property";
import {type KeyMapper} from "../../transformers";


export const propertyMapper: KeyMapper<Property, REALPROPEntity> = {
  id: 'REALKEY',
  parcel_number: 'PARCEL_NO',
  digest_class: 'DIGCLASS',
  neighborhood_id: 'NEIGHBHOOD',
  current_value: 'CURR_VAL',
  land_value: 'A_VALUE',
  residential_improvement_value: 'FMVRES',
  commercial_improvement_value: 'FMVCOM',
  accessory_improvement_value: 'FMVACC',
  override_value: 'OVRIDEVAL',
  total_acreage: 'TOTALACRES',
  land_type: 'LAND_TYPE',
}


export const propertyRecord: DbTable = {
  name: 'REALPROP',
  primaryKey: 'REALKEY',
  columns: [
    'id',
    'name',
    'description',
    'created_at',
    'updated_at',
  ],
}



