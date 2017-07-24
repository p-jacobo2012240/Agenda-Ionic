var db = require('../bin/database.bin')

var tarea = {
   insertarTarea: function(data, callback) {
        if (db){
            var values = [data.titulo, data.descripcion, data.fin, data.estado, data.id]
            db.query('CALL sp_insertarTarea( ?, ?, ?, ?, ?)', values, function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    },

    deleteTarea: function(id, callback) {
        if (db) {
            db.query('CALL sp_deleteTarea(?)', [id], function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    updateTarea: function(data, callback) {
        if (db) {
            var values = [data.titulo, data.descripcion, data.fin, data.estado, data.id]
            db.query('CALL sp_updateTarea( ?, ?, ?, ?, ?)', values, function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    },

    getTareasUser: function(id, callback){
        if (db){
            db.query('SELECT * FROM Tarea WHERE idPerfil = ?', [id], function(err, results){
                if (err) throw err;
                callback(results)
            })
        }
    }
}

module.exports = tarea