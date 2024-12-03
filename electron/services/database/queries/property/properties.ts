
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {propertyMapper} from "../../schema/wingap/mappings/property";
import {REALPROPEntity} from "../../schema/wingap/source/Database";
import type {Property} from "@models/entities/property";
import {mapKeys} from "../../schema";

const mapProperty = (data: REALPROPEntity): Property => mapKeys(data, propertyMapper);

export const getPropertiesTest = async (): Promise<Property[]> => {
  return cachedQuery(`properties:test}`, async () => {
    const pool = await getPool();
    const result: IResult<REALPROPEntity[]> = await pool.request().query(`SELECT TOP(25) * FROM REALPROP`);
    return result.recordset.map(mapProperty);
  }, 300); // Cache for 5 minutes (300 seconds)
};
