var db = require('../bin/database.bin')

var usuario = {
    login: function(data, callback) {
        if (db){
            db.query('CALL sp_login(?,?)', [data.nick, data.password], function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    insertUsuario: function(data, callback) {
        var query = 'CALL sp_insertarUsuario(?,?,?,?,?)'
        var values = [data.nick, data.password, data.nombre, data.apellido, data.correo]
        if (db) {
            db.query(query, values, function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    deleteUsuario: function(id, callback) {
        if (db) {
            db.query('CALL sp_deletePerfil(?)', [id], function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    updateUsuario: function(data, callback) {
        if (db) {
            db.query('CALL sp_updateUsuario(?,?,?)', [data.nick, data.password, data.id], function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    }
}

module.exports = usuario