import {ipcMain} from 'electron';

import {getSalesByLandCode, getSalesWithPropertiesByLandCode} from "../services/database/queries/sales";
import {getSaleCodes} from "../services/database/queries/sales";

ipcMain.handle('sales:land_code', async (_event, [id, years, sale_codes]) => await getSalesByLandCode(id, years, sale_codes));

ipcMain.handle('sales_properties:land_code', async (_event, [id, years, sale_codes]) => await getSalesWithPropertiesByLandCode(id, years, sale_codes));

ipcMain.handle('sales:codes', async () => await getSaleCodes());