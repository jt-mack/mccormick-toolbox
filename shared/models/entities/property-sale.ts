import {BaseEntity} from "../index";


export type PropertySale = BaseEntity & {

  sale_date: Date | string;
  sale_code: string;
  description?: string;
  sale_price: number;
  adjusted_sale_price: number;
  grantor: string;
  grantee: string;

}