const jwt = require('jsonwebtoken');

// Генерация JWT токена
const generateToken = (userId, role) => {
    const payload = {
        userId,
        role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

module.exports = {
    generateToken
};
