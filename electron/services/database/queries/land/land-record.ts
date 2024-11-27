
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {landRecordMapper} from "../../schema/wingap/mappings/land-record";
import {LANDSUBSEntity} from "../../schema/wingap/source/Database";
import type {LandRecord} from "@models/entities/land-record";
import {mapKeys} from "../../schema";

const mapLandRecord = (data: LANDSUBSEntity): LandRecord => mapKeys(data, landRecordMapper);

export const getLandRecords = async (id:number): Promise<LandRecord[]> => {
  return cachedQuery(`land-records:${id}`, async () => {
    const pool = await getPool();
    const result: IResult<LANDSUBSEntity[]> = await pool.request().query(`SELECT * FROM LANDSUBS WHERE SUBDIVCODE='${id}'`);
    return result.recordset.map(mapLandRecord);
  }, 300); // Cache for 5 minutes (300 seconds)
};

// export const getLandClass = async (id: number): Promise<LandClassification> => {
//   return cachedQuery('land-class:id', async () => {
//     const pool = await getPool();
//     const result: IResult<SUBDIVISEntity[]> = await pool.request().query(`SELECT * FROM SUBDIVIS WHERE SUBDIVCODE='${id}'`);
//     return result.recordset.map(mapLandClassification)[0];
//   }, 300);
// }