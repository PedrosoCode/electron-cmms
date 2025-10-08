import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { createRequire } from 'node:module';
import './Global.css'
const require = createRequire(import.meta.url);

// Corrige uso do electron-squirrel-startup
if (require('electron-squirrel-startup')) app.quit();

// Importa o banco
import { initDatabase, getPedidos, insertPedido } from './db.js';

// Declaração das variáveis usadas no template Forge + Vite
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

// Função para criar a janela principal
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Carrega URL de desenvolvimento ou arquivo buildado
  if (typeof MAIN_WINDOW_VITE_DEV_SERVER_URL !== 'undefined') {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.webContents.openDevTools();
}

// Inicialização do app
app.whenReady().then(() => {
  // Inicializa o banco SQLite
  initDatabase();

  // Cria a janela principal
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Fecha tudo no Windows/Linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers (para Vue via preload)
ipcMain.handle('db:getPedidos', async () => getPedidos());
ipcMain.handle('db:insertPedido', async (_e, pedido) => insertPedido(pedido));
