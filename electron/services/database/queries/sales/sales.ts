
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {propertySaleMapper} from "../../schema/wingap/mappings/property-sale";
import {SALEINFOEntity} from "../../schema/wingap/source/Database";
import type {PropertySale} from "@models/entities/property-sale";
import {mapKeys} from "../../schema";

const mapPropertySale = (data: SALEINFOEntity): PropertySale => mapKeys(data, propertySaleMapper);

const lastYear=()=>{
  const d = new Date();
  // d.setFullYear(d.getFullYear()-1);
  // d.setMonth(0);
  // d.setDate(1);
  return d.getFullYear() - 1;
}


export const getSalesByLandCode = async (id: number,years:number[] = [lastYear()]): Promise<PropertySale[]> => {
  return cachedQuery(`sales:land_code:${id}:years:${years.join('|')}`, async () => {
    const pool = await getPool();
    const result: IResult<SALEINFOEntity[]> = await pool.request().query(`SELECT s.* FROM SALEINFO s INNER JOIN LANDSUBS l on l.REALKEY=s.REALKEY and l.SUBDIVCODE='${id}' WHERE l.SUBDIVCODE='${id}' and YEAR(S.SALEDATE) >= ${years[0]} ${years.length > 1 ? `and YEAR(S.SALEDATE) <= ${years?.[1] ?? years[0]}` : ''} order by S.SALEDATE desc`);
    return result.recordset.map(mapPropertySale);
  }, 300);
}

// const lastYear=()=>{
//   const d = new Date();
//   d.setFullYear(d.getFullYear()-1);
//   d.setMonth(0);
//   d.setDate(1);
//   return d;
// }

// export const getSalesByLandCode = async (id: number,dates:{start:Date, end?:Date} = {start:lastYear()}): Promise<LandClassification> => {
//   return cachedQuery(`land-class:${id}`, async () => {
//     const pool = await getPool();
//     const result: IResult<SUBDIVISEntity[]> = await pool.request().query(`SELECT s.* FROM SALEINFO s INNER JOIN LANDSUBS l on l.REALKEY=s.REALKEY and l.SUBVDIVCODE='${id}' WHERE l.SUBDIVCODE='${id}' and S.SALEDATE >= '${dates.start.toISOString()}' ${dates.end ? `and S.SALEDATE <= ${dates.end.toISOString()}` : ''}`);
//     return result.recordset.map(mapLandClassification)[0];
//   }, 300);
// }