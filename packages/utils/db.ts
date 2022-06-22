import config from 'config';
import pgFormat from 'pg-format';
import { Pool } from 'pg';

const db = new Pool(config.db);

export function format(queryString: string, ...params: (string | number)[]): string {
  return pgFormat(queryString, ...params);
}

export function query(queryString: string, parameters?: any) {
  return db.query(queryString, parameters);
}
