var express = require('express')
var router = express.Router()
const perfil = require('../model/perfil.model')

router.route('/api/v1/perfil/:id')
    .delete( (req, res) => {
        perfil.deletePerfil(req.params.id, function(results){
            res.json({mensaje: 'perfil eliminado'})
        })
    })
    .put( (req, res) => {
        req.body.id = req.params.id
        perfil.updatePerfil(req.body, function(results){
            res.json({mensaje: 'Modificado correctamente'})
        })
    })

module.exports = router