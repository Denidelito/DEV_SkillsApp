const db = require('../config/db');

class File {
    static addFile(userId, fileName, filePath, callback) {
        const query = `
            INSERT INTO files (user_id, file_name, file_path, uploaded_at) 
            VALUES (?, ?, ?, NOW())
        `;
        db.query(query, [userId, fileName, filePath], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAllFiles(callback) {
        const query = 'SELECT * FROM files';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getFileById(fileId, callback) {
        const query = 'SELECT * FROM files WHERE id = ?';
        db.query(query, [fileId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]); // Возвращаем только одну запись
        });
    }

    static deleteFileById(fileId, callback) {
        const query = 'DELETE FROM files WHERE id = ?';
        db.query(query, [fileId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static updateFileById(fileId, updatedFileName, updatedFilePath, callback) {
        const query = `
            UPDATE files 
            SET file_name = ?, file_path = ?, updated_at = NOW() 
            WHERE id = ?
        `;
        db.query(query, [updatedFileName, updatedFilePath, fileId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = File;
