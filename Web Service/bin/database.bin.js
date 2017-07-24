const mysql = require('mysql')

const params = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'practica'
}

var conn = mysql.createConnection(params)

module.exports = conn