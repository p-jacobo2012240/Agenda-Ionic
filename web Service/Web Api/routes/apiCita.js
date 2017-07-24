var express = require('express');
var citas = require('../model/citas');
var router = express.Router();
var services = require("../services")

router.use(services.verificar)
router.get('/api/citas/ID/:idUsuario', function(req, res) {
  citas.selectAll(req.params.idUsuario,function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay citass"});
    }
  });
});

router.get('/api/citas/:idcitas',
  function(req, res) {
    var idcitas = req.params.idcitas;
    citas.select(idcitas,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay citass"});
      }
  });
});

router.post('/api/citas', function(req, res) {
  var data = [req.body.lugar ,req.body.descripcion ,req.body.idContacto,req.body.fecha ,req.body.idUsuario ]
  citas.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
       res.json({"Mensaje":true});
    } else {
      res.json({"Mensaje": false});
    }
  });
});

router.put('/api/citas/:idCitas', function(req, res) {
  var idcitas = req.params.idCitas;
  var data = [
    req.body.lugar,
    req.body.descripcion,
    req.body.idContacto, 
    req.body.idCita
  ]                                                                                             
  console.log(idcitas+" "+req.body.idCita+" "+(idcitas == req.body.idCita))
  if(idcitas == req.body.idCita) {
    citas.update(data, function(err, resultado) {
      if(resultado != null) {
        res.json({"Mensaje": false});
      } else {
        res.json({"Mensaje": false,value:"Error en SQL"});
      }
    });
  } else {
    res.json({"Mensaje": false});
  }
});

router.delete('/api/citas/:idCita',
  function(req, res) {
    var idcitas = req.params.idCita;
    citas.delete(idcitas,
      function(error, resultado){
      if(resultado.Mensaje == "Eliminado") {
        res.json({"Mensaje": true});
      } else {
        res.json({"Mensaje": false});
      }
  });
});


module.exports = router;
