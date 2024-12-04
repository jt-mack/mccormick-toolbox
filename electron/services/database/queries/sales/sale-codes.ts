
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {saleCodeMapper} from "../../schema/wingap/mappings/sale-code";
import {REASONEntity} from "../../schema/wingap/source/Database";
import type {Lookup} from "@models/entities/common/lookup";
import {mapKeys} from "../../schema";

const mapSaleCode = (data: REASONEntity): Lookup => mapKeys(data, saleCodeMapper);


export const getSaleCodes = async (): Promise<Lookup[]> => {
  return cachedQuery(`sales:codes`, async () => {
    const pool = await getPool();
    const result: IResult<REASONEntity[]> = await pool.request().query(`SELECT * FROM REASON WHERE DIGEST_VAL>0`);
    return result.recordset.map(mapSaleCode);
  }, 300);
}