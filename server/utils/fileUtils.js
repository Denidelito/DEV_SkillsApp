const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadFolder = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Неверный формат файла. Разрешены только JPEG, PNG и PDF.'), false);
        }
    }
});

const deleteFile = (fileName) => {
    const fullPath = path.join(__dirname, '../uploads/', fileName);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
        } else {
            console.log('Файл успешно удален:', fileName);
        }
    });
};

module.exports = { upload, deleteFile };