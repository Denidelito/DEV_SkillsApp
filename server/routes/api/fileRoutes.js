// Роутер
const express = require('express');
const router = express.Router();
const { upload } = require('../../utils/fileUtils'); // Путь к утилите
const { uploadFile, getAllFiles, deleteFileById } = require('../../controllers/fileController');

// Маршрут для загрузки файла
router.post('/files/upload', upload.single('file'), uploadFile);

// Маршрут для получения всех файлов
router.get('/files', async (req, res) => {
    try {
        const files = await getAllFiles();
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении файлов', error: err });
    }
});

// Маршрут для удаления файла
router.delete('/files/:id', async (req, res) => {
    const fileId = req.params.id;

    try {
        const result = await deleteFileById(fileId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Файл не найден' });
        }
        res.status(200).json({ message: 'Файл успешно удален' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при удалении файла', error: err });
    }
});

module.exports = router;