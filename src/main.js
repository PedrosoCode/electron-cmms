import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

if (require('electron-squirrel-startup')) {
  app.quit();
}

import { initDatabase, getPedidos, insertPedido } from './db.js';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools();
};


app.whenReady().then(() => {
  initDatabase();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


ipcMain.handle('db:getPedidos', async () => {
  return getPedidos();
});

ipcMain.handle('db:insertPedido', async (event, pedido) => {
  return insertPedido(pedido);
});
