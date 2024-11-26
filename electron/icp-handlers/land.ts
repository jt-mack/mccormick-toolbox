import {ipcMain} from 'electron';

import {getLandClasses, getLandClass} from "../services/database/queries/land";

ipcMain.handle('land-class:all', getLandClasses);

ipcMain.handle('land-class:id', async (event, id) => await getLandClass(id));