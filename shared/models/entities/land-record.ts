import {BaseEntity} from "../index";

export type LandRecord = BaseEntity & {
  land_classification_id: string | number
  description?: string
  type: string
  value_method: number
  value_method_lookup?: string
  acres?: number
  square_feet?: number
  frontage?: number
  effective_frontage?: number
  depth?: number
  lots: number
  influence_factor?: number
}