var express = require('express')
var router = express.Router()
const tarea = require('../model/tarea.model')
const service = require('../services/service')
const auth = require('./auth')

router.route('/api/v1/tarea')
    .post(auth, (req, res) => {
        tarea.insertarTarea(req.body, function(results){
            if (Object.keys(results).length){
                res.json(results)
            }
        })
    })

router.route('/api/v1/tarea/:id')
    .get(auth, (req, res) => {
        
    console.log(req.params.id)
        tarea.getTareasUser(req.params.id, function(results){
            res.json(results)
        })
    })

    .delete( auth,  (req, res) => {
        tarea.deleteTarea(req.params.id, function(results){
            res.json({mensaje: 'tarea eliminado'})
        })
    })
    
    .put( auth, (req, res) => {
        req.body.id = req.params.id
        tarea.updateTarea(req.body, function(results){
            res.json({mensaje: 'Modificado correctamente'})
        })
    })


module.exports = router