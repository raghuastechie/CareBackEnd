const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.MYSQLPORT,
        database: process.env.DATABASE
    }
});

module.exports = knex;