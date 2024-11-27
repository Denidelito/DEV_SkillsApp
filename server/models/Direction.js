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

module.exports = {
    addDirection,
    getAllDirections
};
