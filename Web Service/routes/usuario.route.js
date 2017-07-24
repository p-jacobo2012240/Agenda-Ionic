var express = require('express')
var router = express.Router()
const usuario = require('../model/usuario.model')
const service = require('../services/service')
const auth = require('./auth')

router.route('/api/v1/usuario')
    .post( (req, res) => {
        usuario.insertUsuario(req.body, function(results){
            if (Object.keys(results).length){
                req.user = results
                res.status(200).send({
                    mensaje: 'te has logeado correctamente',
                    token: service.createToken(results),
                    usuario: results,
                    estado: true
                })
            } else {
              res.json({estado: false})
            }
        })
    })

router.route('/api/v1/usuario/:id')
    .delete( auth,  (req, res) => {
        usuario.deleteUsuario(req.params.id, function(results){
            res.json({mensaje: 'usuario eliminado'})
        })
    })
    .put( auth, (req, res) => {
        req.body.id = req.params.id
        usuario.updateUsuario(req.body, function(results){
            res.json({mensaje: 'Modificado correctamente'})
        })
    })

router.route('/auth')
    .post( (req, res) => {
        usuario.login(req.body, function(results){
            console.log(results)
            if (Object.keys(results).length){
                res.status(200).send({
                    mensaje: 'te has logeado correctamente',
                    token: service.createToken(results),
                    usuario: results,
                    estado: true
                })
            } else {
                res.json({estado: false})
            }
        })
    })

module.exports = router
