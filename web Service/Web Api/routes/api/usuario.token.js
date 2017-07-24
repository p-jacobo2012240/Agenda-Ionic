var express = require('express');
var jwt = require('jsonwebtoken');
var usuario = require('../../model/usuario');
var router = express.Router();

router.post('/auth/', function(req, res) {
	var data = [req.body.nick, req.body.contrasena]
	usuario.autenticar(data, function(err, resultado) {
		if(typeof resultado !== undefined) {
		if(resultado.length !=0 ){


			var temp = {
				idUsuario: resultado[0].idUsuario,
				nick: resultado[0].nick,
				contrasena: resultado[0].contrasena
			}

			var token = 'Bearer ' + jwt.sign(temp, 'in6av', { expiresIn: 60 * 60 });
			//res.setHeader('Authorization', token);
			resultado[0].estado = true;
			resultado[0].mensaje = "Se otorgo el acceso";
			resultado[0].token = token;
			res.json(resultado[0]);
		}else{
			res.json({estado:false});
		}
			
		} else {
			res.json({
				estado: false,
				mensaje: "No hay usuarios"
			});
		}
	});
});

module.exports = router;
