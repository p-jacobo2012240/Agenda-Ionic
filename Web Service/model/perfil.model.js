var db = require('../bin/database.bin')

var perfil = {

    deletePerfil: function(id, callback) {
        if (db) {
            db.query('CALL sp_deletePerfil(?)', [id], function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    updatePerfil: function(data, callback) {
        if (db) {
            var values = [data.nombre, data.apellido, data.correo, data.id]
            db.query('Call sp_updatePerfil(?, ?, ?, ?)', function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    }
}

module.exports = perfil