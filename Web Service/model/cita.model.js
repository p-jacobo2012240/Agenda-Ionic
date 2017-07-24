var db = require('../bin/database.bin')

var cita = {
   insertarCita: function(data, callback) {
        if (db){
            var values = [data.descripcion, data.lugar, data.fecha, data.id]
            db.query('CALL sp_insertarCita( ?, ?, ?, ?)', values, function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    },

    deleteCita: function(id, callback) {
        if (db) {
            db.query('CALL sp_deleteCita(?)', [id], function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    updateCita: function(data, callback) {
        if (db) {
            var values = [data.descripcion, data.lugar, data.fecha, data.id]
            db.query('CALL sp_updateCita( ?, ?, ?, ?)', values, function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    },

    getCitasUser: function(id, callback){
        if (db){
            db.query('CALL sp_obtenerCita(?)', [id], function(err, results){
                if (err) throw err;
                callback(results)
            })
        }
    }
}

module.exports = cita
