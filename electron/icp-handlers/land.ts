import {ipcMain} from 'electron';

import {getLandClasses, getLandClass, getLandRecords} from "../services/database/queries/land";

ipcMain.handle('land-class:all', getLandClasses);

ipcMain.handle('land-class:id', async (event, id) => await getLandClass(id));

ipcMain.handle('land-records:id', async (event, id) => await getLandRecords(id));