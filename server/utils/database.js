const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '0.0.0.0',
    user: 'root',
    database: 'insurance',
    password: 'admin'
})

module.exports = pool.promise()

