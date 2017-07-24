var tareas = require('../model/tarea');
var router =  require('express').Router();
var services = require("../services")

router.use(services.verificar)
router.get('/api/tarea/ID/:idUsuario', function(req, res) {
  tareas.selectAll(req.params.idUsuario,function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay tareass"});
    }
  });
});

router.get('/api/tarea/:idtarea',
  function(req, res) {
    var idtareas = req.params.idtarea;
    tareas.select(idtareas,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tareass"});
      }
  });
});

router.get('/api/prioridad',
  function(req, res) {
    var idtareas = req.params.idtarea;
    tareas.selectPrioridad(function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tareass"});
      }
  });
});



router.post('/api/tarea', function(req, res) {
  var data = [req.body.nombre ,req.body.descripcion ,req.body.idCategoria,req.body.idPrioridad ,req.body.fecha,req.body.idUsuario ]
  tareas.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
       res.json({"Mensaje":true});
    } else {
      res.json({"Mensaje": false});
    }
  });
});

router.put('/api/tarea/:idtareas', function(req, res) {
  var idtareas = req.params.idtareas;
  var data = [req.body.nombre ,req.body.descripcion ,req.body.idCategoria,req.body.idPrioridad ,req.body.fecha,req.body.idTarea]                                                                                             
  console.log(idtareas+" "+req.body.idTarea+" "+(idtareas == req.body.idTarea))
  if(idtareas == req.body.idTarea) {
    tareas.update(data, function(err, resultado) {
      if(resultado != null) {
        res.json({"Mensaje": true});
      } else {
        res.json({"Mensaje": false,value:"Error en SQL"});
      }
    });
  } else {
    res.json({"Mensaje": false});
  }
});

router.delete('/api/tarea/:idTarea',
  function(req, res) {
    var idtareas = req.params.idTarea;
    tareas.delete(idtareas,
      function(error, resultado){
      if(resultado.Mensaje == "Eliminado") {
        res.json({"Mensaje": true});
      } else {
        res.json({"Mensaje": false});
      }
  });
});


module.exports = router;
