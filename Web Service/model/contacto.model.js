var db = require('../bin/database.bin')

var contacto = {
   insertarContacto: function(data, callback) {
        if (db){
            var values = [data.nombre, data.apellido, data.telefono, data.correo, data.id]
            db.query('CALL sp_insertarContacto( ?, ?, ?, ?, ?)', values, function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    },

    deleteContacto: function(id, callback) {
        if (db) {
            db.query('CALL sp_deleteContacto(?)', [id], function(err, results){
                if (err) throw err
                callback(results[0])
            })
        }
    },

    updateContacto: function(data, callback) {
        if (db) {
            var values = [data.nombre, data.apellido, data.telefono, data.correo, data.id]
            db.query('CALL sp_updateContacto( ?, ?, ?, ?, ?)', values, function(err, results){
                if (err) throw err
                callback(results)
            })
        }
    },

    getContactosUser: function(id, callback){
        if (db){
            db.query('SELECT * FROM Contacto WHERE idPerfil = ?', [id], function(err, results){
                if (err) throw err;
                callback(results)
            })
        }
    }
}

module.exports = contacto