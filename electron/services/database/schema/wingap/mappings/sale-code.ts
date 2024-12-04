import type {DbTable} from "../../common";
import {REASONEntity} from "../source/Database";

import {Lookup} from "@models/entities";
import {type KeyMapper} from "../../transformers";


export const saleCodeMapper: KeyMapper<Lookup, REASONEntity> = {
  code: 'REASONCODE',
  name: 'REASON',
}




