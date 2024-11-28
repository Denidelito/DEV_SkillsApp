const config = require('./port');
const cors = require('cors');

module.exports = cors({
    origin: function (origin, callback) {
        if (!origin || config.allowedDomains.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});
