const mysql = require('mysql2');
require('dotenv').config();

// Создаём подключение к базе данных
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Проверка подключения
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

    console.log('Connected to the database');

    const { createAdminUser } = require('../utils/bcryptUtil');
    createAdminUser(connection);
});

module.exports = connection;
