import {BaseEntity} from "../index";


export type Property = BaseEntity & {
  parcel_number: string;
  digest_class: string;
  neighborhood_id?: string;
  current_value: number;
  land_value?: number;
  residential_improvement_value?: number;
  commercial_improvement_value?: number;
  accessory_improvement_value?: number;
  override_value?: number;
  total_acreage?: number;
  land_type?:number;
}