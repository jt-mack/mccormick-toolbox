import {ipcMain} from 'electron';

import {getSalesByLandCode, getSalesWithPropertiesByLandCode} from "../services/database/queries/sales";

ipcMain.handle('sales:land_code', async (event, [id, years]) => await getSalesByLandCode(id, years));

ipcMain.handle('sales_properties:land_code', async (event, [id, years]) => await getSalesWithPropertiesByLandCode(id, years));