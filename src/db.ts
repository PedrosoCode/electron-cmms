import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';

export interface Pedido {
  id?: number;
  cliente: string;
  data: string;
}

let db: Database.Database;

export function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'cmms.db');
  db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);

  console.log(`📦 Banco inicializado em: ${dbPath}`);
}

export function getPedidos(): Pedido[] {
  return db.prepare('SELECT * FROM pedidos ORDER BY id DESC').all() as Pedido[];
}

export function insertPedido(pedido: Pedido): { id: number } {
  const stmt = db.prepare('INSERT INTO pedidos (cliente, data) VALUES (?, ?)');
  const info = stmt.run(pedido.cliente, pedido.data);
  return { id: Number(info.lastInsertRowid) };
}
