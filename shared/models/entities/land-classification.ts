import {BaseEntity} from "../index";

export type LandClassification = BaseEntity & {
  description: string
  method: number
  method_lookup?: string
  base_rate: number
  base_rate_breakpoint: number
  base_rate_breakpoint_adjustment: number
  record_count?: number
}