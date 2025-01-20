const mysql = require('mysql2');

// Konfigurasi pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_backend',
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,  
});

const promisePool = pool.promise();

module.exports = promisePool;
