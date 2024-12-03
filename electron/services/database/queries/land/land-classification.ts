
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {landClassMapper, landMethodLookup} from "../../schema/wingap/mappings/land-classification";
import {SUBDIVISEntity} from "../../schema/wingap/source/Database";
import type {LandClassification} from "@models/entities/land-classification";
import {mapKeys} from "../../schema";

const mapLandClassification = (data: SUBDIVISEntity & {record_count?:number}): LandClassification => ({...mapKeys(data, landClassMapper),method_lookup:landMethodLookup(data!.CALCMETHOD as number), record_count:data?.record_count});

export const getLandClasses = async (): Promise<LandClassification[]> => {
  return cachedQuery('land-class:all', async () => {
    const pool = await getPool();
    const result: IResult<SUBDIVISEntity[]> = await pool.request().query('SELECT s.*, (select count(REALKEY) from landsubs l where l.SUBDIVCODE=s.SUBDIVCODE) as record_count FROM SUBDIVIS s');
    return result.recordset.map(mapLandClassification);
  }, 300); // Cache for 5 minutes (300 seconds)
};

export const getLandClass = async (id: number): Promise<LandClassification> => {
  return cachedQuery(`land-class:${id}`, async () => {
    const pool = await getPool();
    const result: IResult<SUBDIVISEntity[]> = await pool.request().query(`SELECT * FROM SUBDIVIS WHERE SUBDIVCODE='${id}'`);
    return result.recordset.map(mapLandClassification)[0];
  }, 300);
}