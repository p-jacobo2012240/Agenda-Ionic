var express = require('express')
var router = express.Router()
const cita = require('../model/cita.model')
const service = require('../services/service')
const auth = require('./auth')

router.route('/api/v1/cita')
    .post(auth, (req, res) => {
        cita.insertarCita(req.body, function(results){
            if (Object.keys(results).length){
                res.json(results)
            }
        })
    })

router.route('/api/v1/cita/:id')
    .get(auth, (req, res) => {
        
    console.log(req.params.id)
        cita.getCitasUser(req.params.id, function(results){
            res.json(results)
        })
    })

    .delete( auth,  (req, res) => {
        cita.deleteCita(req.params.id, function(results){
            res.json({mensaje: 'cita eliminado'})
        })
    })
    
    .put( auth, (req, res) => {
        req.body.id = req.params.id
        cita.updateCita(req.body, function(results){
            res.json({mensaje: 'Modificado correctamente'})
        })
    })


module.exports = router