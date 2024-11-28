const express = require('express');
const path = require('path');
const cors = require('./config/cors');
const config = require('./config/port');
const apiRoutes= require("./routes");
const authMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes');

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
app.use('/api', authMiddleware, apiRoutes);
app.use('/auth', authRoutes);


// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running on port ${config.port}`);
});
