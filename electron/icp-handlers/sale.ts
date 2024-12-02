import {ipcMain} from 'electron';

import {getSalesByLandCode} from "../services/database/queries/sales";

ipcMain.handle('sales:land_code', async (event, [id, years]) => await getSalesByLandCode(id, years));