import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getPedidos: () => ipcRenderer.invoke('db:getPedidos'),
  insertPedido: (pedido) => ipcRenderer.invoke('db:insertPedido', pedido),
});
