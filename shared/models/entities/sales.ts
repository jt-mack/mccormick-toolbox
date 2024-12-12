import type {PropertyWithSale} from "@models/entities";
export type SalesRatio={
  count:number;
  medianRatio:number;
  cod:number;
  prd:number;
  upperLimit:number;
  lowerLimit:number;
  outliers?:PropertyWithSale[];
}

export type SalesRatioType= .4|1;