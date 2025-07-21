import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

class Mysql {
  static async openDb() {
    const pool = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    return pool;
  }

  query(sql, params = []) {
    try {
      if (!this.pool) {
        throw new Error('Database connection pool is not initialized');
      }

      return this.pool.query(sql, params);
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }
}

export default Mysql;
