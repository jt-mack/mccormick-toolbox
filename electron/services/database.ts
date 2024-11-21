import sql from 'mssql'
import type { DbConfig } from '../../src/types'
import {app} from 'electron'
import path from "node:path";
import fs from "node:fs";

const sqlConfigPath=path.join(app.getPath('userData'), 'config.json');

export async function testConnection(config: DbConfig): Promise<{ success: boolean; message: string }> {
  try {
    await sql.connect(config)
    await sql.query`SELECT 1`;
    return { success: true, message: 'Connection successful' }
  } catch (err: any) {
    return { success: false, message: err.message }
  }
}

export async function getConfig():Promise<DbConfig|null>{
  try {
    const config = JSON.parse(fs.readFileSync(sqlConfigPath, 'utf8'));
    return Promise.resolve(config);
  } catch (e) {
    return Promise.reject({'success':false,'message':'Error loading config: '+e.message});
  }

}

export async function query(query: string): Promise<any> {
  try {
    const config = await getConfig();
    await sql.connect(config!);
    const result = await sql.query(`${query}`);
    return Promise.resolve(result.recordset);
  } catch (e) {
    console.error({e});
    return Promise.reject({'success': false, 'message': 'Error executing query: ' + e.message});
  }
}