
import type {IResult} from 'mssql';
import {getPool} from "../../index";
import {cachedQuery} from "../../utils/cacheQuery";
import {propertySaleMapper, propertyWithSaleMapper, QualifiedSaleCodes} from "../../schema/wingap/mappings/property-sale";
import {SALEINFOEntity, REALPROPEntity} from "../../schema/wingap/source/Database";
import type {PropertySale, PropertyWithSale, Lookup} from "@models/entities";
import {mapKeys} from "../../schema";

const mapPropertySale = (data: SALEINFOEntity): PropertySale => mapKeys(data, propertySaleMapper);

const mapPropertyWithSale=(data:SALEINFOEntity & REALPROPEntity):PropertyWithSale=>({...mapKeys(data,propertyWithSaleMapper),land_value:(data.A_VALUE ?? 0) + (data.P_VALUE ?? 0)});


const lastYear=()=>{
  const d = new Date();
  // d.setFullYear(d.getFullYear()-1);
  // d.setMonth(0);
  // d.setDate(1);
  return d.getFullYear() - 1;
}

const whereClauses=(sale_codes:string[]=QualifiedSaleCodes)=>['NET_SP>0',`REASON IN (${(sale_codes).map(sc=>`'${sc}'`).join(',')})`];

export const getSalesByLandCode = async (id: number,years:number[] = [lastYear()], sale_codes:Lookup[]): Promise<PropertySale[]> => {
  return cachedQuery(`sales:land_code:${id}:years:${years.join('|')}:codes:${sale_codes.map(s=>s.code).join('|')}`, async () => {
    const pool = await getPool();
    const saleCodes = sale_codes.map(sc=>sc.code);
    const result: IResult<SALEINFOEntity[]> = await pool.request().query(`SELECT s.* FROM SALEINFO s INNER JOIN LANDSUBS l on l.REALKEY=s.REALKEY and l.SUBDIVCODE='${id}' WHERE ${whereClauses(saleCodes).join(' AND ')} AND l.SUBDIVCODE='${id}' and YEAR(S.SALEDATE) >= ${years[0]} ${years.length > 1 ? `and YEAR(S.SALEDATE) <= ${years?.[1] ?? years[0]}` : ''} order by S.SALEDATE desc`);
    return result.recordset.map(mapPropertySale);
  }, 300);
}

export const getSalesWithPropertiesByLandCode = async (id: number,years:number[] = [lastYear()], sale_codes:string[]): Promise<PropertyWithSale[]> => {
  return cachedQuery(`sales_properties:land_code:${id}:years:${years.join('|')}:codes:${sale_codes.join('|')}`, async () => {
    const pool = await getPool();
   
    const result: IResult<Array<REALPROPEntity&SALEINFOEntity>> = await pool.request().query(`SELECT r.*,s.SALEDATE,s.REASON,s.SALEPRICE,s.NET_SP,s.GRANTOR,s.GRANTEE,s.COMMENT,s.VACANT_SALE FROM SALEINFO s INNER JOIN REALPROP r on s.REALKEY = r.REALKEY INNER JOIN LANDSUBS l on l.REALKEY=s.REALKEY and l.SUBDIVCODE='${id}' WHERE ${whereClauses(sale_codes).join(' AND ')} AND l.SUBDIVCODE='${id}' and YEAR(S.SALEDATE) >= ${years[0]} ${years.length > 1 ? `and YEAR(S.SALEDATE) <= ${years?.[1] ?? years[0]}` : ''} order by S.SALEDATE desc`);
    return result.recordset.map(mapPropertyWithSale);
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