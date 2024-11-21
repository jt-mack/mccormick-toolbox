
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {landClassMapper} from "../../schema/wingap/mappings/land-classification";
import {SUBDIVISEntity} from "../../schema/wingap/source/Database";
import type {LandClassification} from "@models/entities/land-classification";
import {mapKeys} from "../../schema";

const mapLandClassification = (data: SUBDIVISEntity): LandClassification => mapKeys(data, landClassMapper);

export const getLandClasses = async (): Promise<LandClassification[]> => {
  return cachedQuery('land-class:all', async () => {
    const pool = await getPool();
    const result: IResult<SUBDIVISEntity[]> = await pool.request().query('SELECT * FROM SUBDIVIS');
    return result.recordset.map(mapLandClassification);
  }, 300); // Cache for 5 minutes (300 seconds)
};