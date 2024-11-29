const db = require('../config/db');

// Модель для добавления нового направления
const addDirection = (name, description) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO directions (name, description, created_at) VALUES (?, ?, NOW())';
        db.query(query, [name, description], (err, results) => {
            if (err) {
                console.error('Error adding direction:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Модель для получения всех направлений
const getAllDirections = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM directions';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching directions:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Модель для удаления направления
const deleteDirection = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM directions WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error deleting direction:', err);
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject(new Error('No direction found with the provided ID'));
            }
            resolve(results);
        });
    });
};

module.exports = {
    addDirection,
    getAllDirections,
    deleteDirection
};
