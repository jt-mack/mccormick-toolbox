import type {DbTable} from "../../common";
import {SALEINFOEntity} from "../source/Database";

import {PropertySale} from "@models/entities/property-sale";
import {type KeyMapper} from "../../transformers";


export const propertySaleMapper: KeyMapper<PropertySale, SALEINFOEntity> = {
  id: 'SALEKEY',
  property_id: 'REALKEY',
  sale_date: 'SALEDATE',
  sale_code: 'REASON',
  sale_price: 'SALEPRICE',
  adjusted_sale_price:'NET_SP',
  grantor:'GRANTOR',
  grantee:'GRANTEE',
  description: 'COMMENT',
}


export const propertySaleRecord: DbTable = {
  name: 'SALEINFO',
  primaryKey: 'SALEKEY',
  columns: [
    'id',
    'name',
    'description',
    'created_at',
    'updated_at',
  ],
}



