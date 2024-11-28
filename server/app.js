const express = require('express');
const path = require('path');
const cors = require('./config/cors');
const config = require('./config/port')
const apiRoutes= require("./routes")
require('dotenv').config();

const app = express();
const port = config.port;

app.use(
    cors,
    express.json()
);


// Обслуживание статических файлов для админки
app.use(express.static(path.join(__dirname, '../admin/dist')));
// Обслуживание запросов для админки
app.use('/admin', express.static(path.join(__dirname, '../admin/dist/')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
});

// API маршруты
app.use(apiRoutes);


// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running on port ${config.port}`);
});
