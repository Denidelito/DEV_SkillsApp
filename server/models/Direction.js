const db = require('../config/db');

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

const updateDirection = (id, name, description) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE directions SET name = ?, description = ?, updated_at = NOW() WHERE id = ?';
        db.query(query, [name, description, id], (err, results) => {
            if (err) {
                console.error('Error updating direction:', err);
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
    deleteDirection,
    updateDirection
};
