var contacto = require('../model/contacto');
var router = require('express').Router();
var multer=require("multer"),
    path = require('path')

var services = require("../services")

router.use(services.verificar)


router.get('/api/contacto/ID/:idUsuario', function(req, res) {
  contacto.selectAll(req.params.idUsuario,function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay contactos"});
    }
  });
});

router.get('/api/contacto/:idContacto',
  function(req, res) {
    var idContacto = req.params.idContacto;
    contacto.select(idContacto, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": false});
      }
  });
});

router.post('/api/contacto', function(req, res) {
  var data = [ req.body.idUsuario, req.body.nombre, req.body.apellido,"", req.body.telefono, req.body.correo, req.body.idCategoria ]
  console.log(data)
  contacto.insert(data, function(err, resultado) {
    if(resultado.Mensaje.length != 0) {
      res.json({Mensaje: true})
    } else {
      res.json({"Mensaje": false});
    }
  });
});

router.put('/api/contacto/:idContacto', function(req, res) {
  var data = [req.body.nombre, req.body.apellido, req.body.telefono, req.body.correo, req.body.idCategoria, req.body.idContacto]
  if(req.params.idContacto == req.body.idContacto){
    contacto.update(data, function(err, resultado) {
     if(resultado.Mensaje.length != 0) {
         res.json({Mensaje: true})
      } else {
          res.json({Mensaje: false})
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/contacto/:idContacto/:idUsuario', function(req, res) {
	var data = [req.params.idContacto, req.params.idUsuario];
    contacto.delete(data, function(error, resultado){
      if(resultado.Mensaje.length != 0) {
         res.json({Mensaje: true})
      } else {
         res.json({Mensaje: false})
      }
  });
});


module.exports = router;
