import {BaseEntity} from "../index";

export type LandClassification = BaseEntity & {
  description: string
  method: number
  base_rate: number
}