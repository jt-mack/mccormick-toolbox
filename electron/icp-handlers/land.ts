import { ipcMain } from 'electron';

import {getLandClasses} from "../services/database/queries/land";

ipcMain.handle('land-class:all', getLandClasses);