var express = require('express');
var categoria = require('../model/categoria');
var router = express.Router();
var services = require("../services")

router.use(services.verificar)
router.get('/api/categoria/ID/:idUsuario', function(req, res) {
  categoria.selectAll(req.params.idUsuario,function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay categorias"});
    }
  });
});

router.get('/api/categoria/:idCategoria',
  function(req, res) {
    var idCategoria = req.params.idCategoria;
    categoria.select(idCategoria,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay categorias"});
      }
  });
});

router.post('/api/categoria', function(req, res) {
  var data = [req.body.nombre, req.body.idUsuario]
  categoria.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
       res.json({"Mensaje":true});
    } else {
      res.json({"Mensaje": false});
    }
  });
});

router.put('/api/categoria/:idCategoria', function(req, res) {
  var idCategoria = req.params.idCategoria;
  var data = [
    req.body.nombre,
    req.body.idUsuario,
    req.body.idCategoria
  ]                                                                                             

  if(idCategoria == req.body.idCategoria) {
    categoria.update(data, function(err, resultado) {
      if(typeof resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la categoria"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/categoria/:idCategoria',
  function(req, res) {
    var idCategoria = req.params.idCategoria;
    categoria.delete(idCategoria,
      function(error, resultado){
      if(resultado && resultado.Mensaje == "Eliminado") {
        res.json({"Mensaje": true});
      } else {
        res.json({"Mensaje": false});
      }
  });
});


module.exports = router;
