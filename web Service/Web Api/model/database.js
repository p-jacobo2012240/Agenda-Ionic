var mysql = require("mysql");
var parametros = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agendax2'
};
try{
var connection = mysql.createConnection(parametros);
}catch(ex){
  parametros.database="agenda";
var connection = mysql.createConnection(parametros);
}

module.exports = connection;
