// Контроллер
const File = require('../models/File');
const path = require('path');
const { deleteFile } = require('../utils/fileUtils');

// Контроллер для добавления файла
const addFile = async (userId, fileName, filePath) => {
    return new Promise((resolve, reject) => {
        File.addFile(userId, fileName, filePath, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Контроллер для получения всех файлов
const getAllFiles = async () => {
    return new Promise((resolve, reject) => {
        File.getAllFiles((err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Контроллер для удаления файла по ID
const deleteFileById = async (fileId) => {
    return new Promise((resolve, reject) => {
        File.getFileById(fileId, (err, file) => {
            if (err) {
                return reject(err);
            }
            if (!file) {
                return reject(new Error('Файл не найден'));
            }

            const fileName = path.basename(file.file_path);

            deleteFile(fileName);

            // Удаляем файл из базы данных
            File.deleteFileById(fileId, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    });
};

// Контроллер для обработки загрузки файла
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не был загружен' });
    }

    const { originalname, path: filePath } = req.file;
    const userId = req.body.user_id || null;

    const directoryPath = path.dirname(filePath);
    const folderName = path.basename(filePath);


    try {
        const result = await addFile(userId, originalname, path.basename(directoryPath)+'/'+folderName);
        res.status(200).json({
            message: 'Файл успешно загружен',
            fileId: result.insertId,
            filePath: path.basename(directoryPath)+'/'+folderName
        });
    } catch (err) {
        console.error('Ошибка при сохранении файла в базу:', err);
        res.status(500).json({ message: 'Ошибка при сохранении файла в базу данных', error: err });
    }
};

module.exports = {
    addFile,
    getAllFiles,
    deleteFileById,
    uploadFile
};