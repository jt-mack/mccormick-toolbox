import {BaseEntity} from "../index";
import {Property} from "./property";
import {Lookup} from "@models/entities/common";

type BaseSale = {
  sale_date: Date | string;
  sale_code: string;
  description?: string;
  sale_price: number;
  adjusted_sale_price: number;
  grantor: string;
  grantee: string;
  is_vacant: boolean;
  ratio?: number;
}

export type PropertySale = BaseEntity & BaseSale;

export type PropertyWithSale = Property & BaseSale;

export const FairMarketSales=['FM','LM'];