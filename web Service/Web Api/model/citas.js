var database = require('./database');
var citas = {};

citas.selectAll = function(ID,callback) {
  if(database) {
    database.query("SELECT ci.*, con.nombre, DATE_FORMAT(ci.fecha , '%Y-%m-%d') AS fechaFormat, DATE_FORMAT(ci.fecha , '%H:%i:%s') AS horaFormat, DATEDIFF( DATE(ci.fecha) , DATE(NOW()) ) AS dias , con.apellido FROM cita ci INNER JOIN contacto con ON con.idContacto = ci.idContacto WHERE idUsuario= ?;",ID,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

citas.select = function(idcitas, callback) {
  if(database) {
    var sql = "SELECT ci.*, con.nombre, DATE_FORMAT(ci.fecha , '%Y-%m-%d') AS fechaFormat, DATE_FORMAT(ci.fecha , '%H:%i:%s') AS horaFormat, DATEDIFF( DATE(ci.fecha) , DATE(NOW()) ) AS dias , con.apellido FROM cita ci INNER JOIN contacto con ON con.idContacto = ci.idContacto WHERE idCita = ?";
    database.query(sql, idcitas,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

citas.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO cita (lugar, descripcion, idContacto, fecha, idUsuario) VALUES(?,?,?,?,?) ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

citas.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE cita SET lugar = ?, descripcion = ? , idContacto = ? WHERE idCita = ?";
    database.query(sql, data, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": true});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

citas.delete = function(idcitas, callback) {
  if(database) {
    var sql = "DELETE FROM cita WHERE idCita = ?";
    database.query(sql, idcitas,
    function(error, resultado) {
      if(error) {
        //throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = citas;
