require('dotenv').config();

const config = {
    dbUrl: process.env.DB_URL,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
};

module.exports = config;