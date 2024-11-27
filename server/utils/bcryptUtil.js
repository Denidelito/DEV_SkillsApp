const bcrypt = require('bcryptjs');

// Функция для хеширования пароля и создания пользователя
const createAdminUser = (connection) => {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error checking admin user:', err);
            return;
        }

        if (results.length === 0) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return;
                }

                const role = 'admin';
                connection.query('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, results) => {
                    if (err) {
                        console.error('Error creating admin user:', err);
                        return;
                    }
                    console.log('Admin user created successfully');
                });
            });
        } else {
            console.log('Admin user already exists');
        }
    });
};

module.exports = { createAdminUser };
