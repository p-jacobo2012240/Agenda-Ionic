var router = require("express").Router();
var usuario = require("../model/usuario.js")

router.post("/api/usuario/registrar", function(req,res){

    var usu = [];
    console.log("Entro al registrar")
     usuario.countUsers(req.body.nick, function(resultado){
        usu = resultado;
        console.log(usu)
        if(usu[0].cuentaData == 0){
            var filePath = (req.body.filePath!= "")?req.body.filePath :"https://image.flaticon.com/icons/svg/201/201818.svg" ;
            usuario.insert([req.body.nick, req.body.contrasena, filePath], function(error, resultado){
                if(error!== undefined){
                    res.json({Mensaje: true})
                }else{
                    res.json({Mensaje: false})
                }
            });
    }else{
        res.json({Mensaje:false,Estado: "Ya existe un usuario con su nick. Elija otro"})
    }
    });
    
    
});

module.exports = router;