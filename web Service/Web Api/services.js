var jwt = require('jsonwebtoken');
var services = {};
services.verificar = function(req, res, next) {
	if(req.method == "OPTIONS"){
		console.log("Method: "+req.method);
		next()
	}else{
	var token = services.getToken(req, res, next);
	jwt.verify(token, 'in6av', function(err, decoded) {
		if(err) {
			res.json({
				success: false,
				mensaje: "Error en el token",
				error: err
			});
		} else {
			console.log("Token valido");
			req.token = token;
			next();
		}
	});
	}
}

services.getToken = function(req, res, next) {
	var header = req.headers.authorization;
	if (typeof header != 'undefined') {
		var headerArray = header.split(" ");
		//var token = headerArray[1];
		var token = headerArray.pop();
		if(token) {
			return token;
		} else {
			console.log("No Existe el token");
			res.json({
				estado: false,
				mensaje: "No existen el token"
			});
		}
	} else {
		res.json({
			estado: false,
			mensaje: "No Existe la cabecera Authorization"
		});
	}
}

module.exports = services;
