import sql from 'mssql'
// import type { DbConfig, PaginationOptions } from '../../../src/types'
import type {DbConfig, PaginationOptions} from '@models/db';
import {paginationQuery} from "./utils/pagination.ts";
import {app} from 'electron'
import path from "node:path";
import fs from "node:fs";

const sqlConfigPath = path.join(app.getPath('userData'), 'config.json');

let pool: sql.ConnectionPool | null = null;

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (!pool) {
    const config = await getConfig();
    pool = await sql.connect(config);
  }
  return pool;
};

export const closePool = async () => {
  if (pool) {
    await pool.close();
    pool = null;
  }
};

export async function testConnection(config: DbConfig): Promise<{ success: boolean; message: string }> {
  try {
    await sql.connect(config)
    await sql.query`SELECT 1`;
    return {success: true, message: 'Connection successful'}
  } catch (err: any) {
    return {success: false, message: err.message}
  }
}

export async function getConfig(): Promise<DbConfig> {
  try {
    const config = JSON.parse(fs.readFileSync(sqlConfigPath, 'utf8'));
    return Promise.resolve(config);
  } catch (e: any) {
    return Promise.reject({'success': false, 'message': 'Error loading config: ' + e.message});
  }

}

export async function query(query: string): Promise<any> {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`${query}`);
    return Promise.resolve(result.recordset);
  } catch (e: any) {
    console.error({e});
    return Promise.reject({'success': false, 'message': 'Error executing query: ' + e.message || ''});
  }
}

export async function paginateQuery(options: PaginationOptions): Promise<any> {
  try {
    return await paginationQuery(options);
  } catch (e: any) {
    console.error({e});
    return Promise.reject({'success': false, 'message': 'Error executing query: ' + e.message || ''});
  }
}