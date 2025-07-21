import MysqlClass from '../Helpers/Mysql.js';
import PostgresClass from '../Helpers/Postgresql.js'
import SqliteClass from '../Helpers/Sqlite.js';

let pool;

const DatabaseType = {
  'mysql': MysqlClass,
  'postgres': PostgresClass,
  'sqlite': SqliteClass
}

export async function openDb(type) {
  if (!pool) {
    if (DatabaseType[type] && typeof DatabaseType[type].openDb === 'function') {
      pool = await DatabaseType[type].openDb();
    } else {
      throw new Error(`Unsupported database type or openDb function not found: ${type}`);
    }
  }
  return pool;
}