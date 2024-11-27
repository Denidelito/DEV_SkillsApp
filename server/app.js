const express = require('express');
const app = express();

// Базовый роут
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Указываем порт
const PORT = process.env.PORT || 3000;

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
