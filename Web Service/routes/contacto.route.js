var express = require('express')
var router = express.Router()
const contacto = require('../model/contacto.model')
const service = require('../services/service')
const auth = require('./auth')

router.route('/api/v1/contacto')
    .post(auth, (req, res) => {
        contacto.insertarContacto(req.body, function(results){
            if (Object.keys(results).length){
                res.json(results)
            }
        })
    })

router.route('/api/v1/contacto/:id')
    .get(auth, (req, res) => {
        
    console.log(req.params.id)
        contacto.getContactosUser(req.params.id, function(results){
            res.json(results)
        })
    })

    .delete( auth,  (req, res) => {
        contacto.deleteContacto(req.params.id, function(results){
            res.json({mensaje: 'contacto eliminado'})
        })
    })
    
    .put( auth, (req, res) => {
        req.body.id = req.params.id
        contacto.updateContacto(req.body, function(results){
            res.json({mensaje: 'Modificado correctamente'})
        })
    })


module.exports = router