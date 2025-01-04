const mysql = require('mysql2');
require('dotenv').config();

// Создаём пул соединений
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
});

// Проверка соединения
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

    console.log('Connected to the database');
    connection.release();

    const { createAdminUser } = require('../utils/bcryptUtil');
    createAdminUser(pool);
});

pool.on('error', (err) => {
    console.error('MySQL pool error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.warn('Database connection lost. Attempting to reconnect...');
    } else {
        throw err;
    }
});


// Экспортируем пул
module.exports = pool;
