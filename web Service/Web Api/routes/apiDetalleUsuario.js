var detalleUsuario = require("../model/detalleusuario")
var router = require("express").Router();
var services = require("../services")

router.use(services.verificar)
router.get('/api/detalleusuario/:idUsuario', function(req, res){
    detalleUsuario.select(req.params.idUsuario, function(error, resultado){
        if(error !== undefined){
            res.json(resultado);
        }else{
            res.json({Mensaje: false});
        }
    });
});

router.post('/api/detalleusuario', function(req, res){
    detalleUsuario.insert([req.body.idUsuario, req.body.idContacto], function(error, resultado){
        if(error !== undefined){
            res.json(resultado);
        }else{
            res.json({Mensaje: false});
        }
    });
});

router.put('/api/detalleusuario/:idDetalleUsuario', function(req, res){
    if(req.params.idDetalleUsuario == req.body.idDetalleUsuario){
        detalleUsuario.update([req.body.idUsuario, req.body.idContacto,req.body.idDetalleUsuario], function(error, resultado){
        if(error !== undefined){
            res.json({Mensaje: true});
        }else{
            res.json({Mensaje: false});
        }
    });
    }else{
        res.json({Mensaje: true, Respuesta: "ID incoherente"});
    }
});

router.delete('/api/detalleusuario/:idDetalleUsuario', function(req, res){
    detalleUsuario.delete(req.params.idDetalleUsuario, function(error, resultado){
        if(error !== undefined){
             res.json({Mensaje: true});
        }else{
            res.json({Mensaje: false});
        }
    });
});
module.exports = router;