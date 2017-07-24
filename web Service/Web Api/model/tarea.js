var database = require('./database');
var tareas = {};

tareas.selectAll = function(ID,callback) {
  if(database) {
    database.query("SELECT cat.nombre AS nombreCategoria, pri.nombre AS nombrePrioridad , DATE_FORMAT(ta.fecha , '%Y-%m-%d') AS fechaFormat , ta.* FROM tarea ta INNER JOIN categoria cat on cat.idCategoria = ta.idCategoria INNER JOIN prioridad pri ON pri.idPrioridad = ta.idPrioridad WHERE ta.idUsuario= ? ORDER BY pri.idPrioridad;",ID,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tareas.selectPrioridad = function(callback) {
  if(database) {
    database.query("SELECT * FROM prioridad;",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tareas.select = function(idtareas, callback) {
  if(database) {
    var sql = "SELECT ci.*, con.nombre , con.apellido FROM tarea ci INNER JOIN contacto con ON con.idContacto = ci.idContacto WHERE idtarea = ?";
    database.query(sql, idtareas,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tareas.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO `tarea`(`nombre`, `descripcion`, `idCategoria`, `idPrioridad`, `fecha`,`idUsuario`) VALUES (?,?,?,?,?,?);", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tareas.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE `tarea` SET `nombre`=?,`descripcion`=?,`idCategoria`=?,`idPrioridad`=?,`fecha`=? WHERE idTarea = ? ;";
    database.query(sql, data, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tareas.delete = function(idtareas, callback) {
  if(database) {
    var sql = "DELETE FROM tarea WHERE idTarea = ?";
    database.query(sql, idtareas,
    function(error, resultado) {
      if(error) {
        //throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = tareas;
