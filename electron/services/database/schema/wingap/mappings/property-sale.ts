import type {DbTable} from "../../common";
import {SALEINFOEntity, REALPROPEntity} from "../source/Database";

import {PropertySale, PropertyWithSale} from "@models/entities";
import {propertyMapper} from "./property";
import {type KeyMapper} from "../../transformers";

export const QualifiedSaleCodes=['FM','LM'];

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
  is_vacant: 'VACANT_SALE',
}

export const propertyWithSaleMapper: KeyMapper<PropertyWithSale, SALEINFOEntity & REALPROPEntity> = {
  ...propertyMapper,
  // id: 'SALEKEY',
  // property_id: 'REALKEY',
  sale_date: 'SALEDATE',
  sale_code: 'REASON',
  sale_price: 'SALEPRICE',
  adjusted_sale_price:'NET_SP',
  grantor:'GRANTOR',
  grantee:'GRANTEE',
  description: 'COMMENT',
  is_vacant: 'VACANT_SALE',
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



