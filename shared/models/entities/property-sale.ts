import {BaseEntity} from "../index";
import {Property} from "./property";

type BaseSale = {
  sale_date: Date | string;
  sale_code: string;
  description?: string;
  sale_price: number;
  adjusted_sale_price: number;
  grantor: string;
  grantee: string;
}

export type PropertySale = BaseEntity & BaseSale;

export type PropertyWithSale = Property & BaseSale;