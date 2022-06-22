import { Client } from 'pg';
import config from 'config';
import pgFormat from 'pg-format';

let db;

export function connect() {
  db = new Client(config.db);
  return db.connect();
}

export function format(queryString: string, ...params: (string | number)[]): string {
  return pgFormat(queryString, ...params);
}

export async function query(queryString: string, parameters?: any) {
  if (!db) await connect();

  return db.query(queryString, parameters);
}
