import { contextBridge, ipcRenderer } from 'electron';
import type { Pedido } from './db.js';
import './Global.css'

contextBridge.exposeInMainWorld('api', {
  getPedidos: (): Promise<Pedido[]> => ipcRenderer.invoke('db:getPedidos'),
  insertPedido: (pedido: Pedido): Promise<{ id: number }> =>
    ipcRenderer.invoke('db:insertPedido', pedido),
});

declare global {
  interface Window {
    api: {
      getPedidos: () => Promise<Pedido[]>;
      insertPedido: (pedido: Pedido) => Promise<{ id: number }>;
    };
  }
}
