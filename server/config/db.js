const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'krishimitra',
  waitForConnections: true,
  connectionLimit: 10,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

let isConnected = false;

pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL Database connected successfully.');
    isConnected = true;
    conn.release();
  })
  .catch(() => {
    console.warn('⚠️  MySQL connection failed. Running in memory fallback mode.');
    isConnected = false;
  });

module.exports = {
  query: (text, params) => pool.execute(text, params),
  isDbConnected: () => isConnected,
  pool
};
