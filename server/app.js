const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Middleware для парсинга JSON тела запроса
app.use(express.json());

// Подключаем маршруты
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Указываем порт
const PORT = process.env.PORT || 3000;

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
