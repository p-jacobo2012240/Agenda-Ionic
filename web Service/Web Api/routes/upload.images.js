var formidable = require('formidable');
var express = require('express');

var router = express.Router();

router.post('/upload', function(req, res, next) {
    console.log('si llego hasta aca xD');
    var form = formidable.IncomingForm()
    var filePath = 'http://localhost:3000/';
    var fileServer = 'http://localhost:3000/';
    var nameFile = ""
    form.parse(req, function() {
    });
    form.on('fileBegin', function(name, file) {
      filePath += file.path = './public/images/' + file.name;
      nameFile = file.name
    });

    form.on('end', ()=> {
      res.json({"Mensaje": fileServer+"images/"+nameFile});
      res.end();
    })

});


module.exports = router;