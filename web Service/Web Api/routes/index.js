var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.cookies.UNI);
  if( req.cookies.UNI == null){
   res.render('index',{title:"Agenda", opciones: '<a href="/autenticar">Autenticar</a><a href="/registrar">Registrate</a>'} );
   res.end();
}else{
   res.redirect("/usuario");
   res.end();
  }
});

router.get('/autenticar', function(req, res, next) {
  res.render("autenticar", {title:"Autenticar | Agenda", opciones: '<a href="/autenticar">Autenticar</a><a href="/registrar">Registrate</a>'});
  res.end();
});

router.get('/cargar', function(req, res, next) {
  res.render("cargarFoto", {title:"Cargar Foto | Agenda", opciones: '<a href="/autenticar">Autenticar</a><a href="/registrar">Registrate</a>'});
  res.end();
});

router.get('/registrar', function(req, res, next) {
    res.render("registrar", {title:"Registrare | Agenda", opciones: '<a href="/autenticar">Autenticar</a><a href="/registrar">Registrate</a>'});
    res.end();
});

router.get('/error', function(req, res, next) {
    res.render("error", {title:"Error | Agenda", opciones: '<a href="/autenticar">Autenticar</a><a href="/registrar">Registrate</a>'});
    res.end();
});


router.get('/usuario', function(req, res, next) {
  if(req.cookies.UNI != null){
  var nombre = req.cookies.UNI;
  res.render("usuario/index",{title:"Agenda", saludo: "¡Hola "+nombre+"!, aca tienes tus contactos", opciones: '<a href="/usuario/categoria">Categorias</a><a href="/usuario/cita">Citas</a><a href="/usuario/tarea">Tarea</a><a href="#" data-toggle="modal" data-target="#editUser">Editar Mi Perfil</a><a href="" onclick="cerrarS()">Cerrar Sesion</a>'});
  }else{
    res.redirect("/")
  }
});

router.get('/usuario/categoria', function(req, res, next) {
  if(req.cookies.UNI != null){
  var nombre = req.cookies.UNI;
  res.render("categoria/index",{title: "Categorias | Agenda", saludo: "¡Hola "+nombre+"!, aca tienes tus categorias", opciones: '<a href="/usuario/categoria">Categorias</a><a href="/usuario/cita">Citas</a><a href="/usuario/tarea">Tarea</a><a href="#" data-toggle="modal" data-target="#editUser">Editar Mi Perfil</a><a href="" onclick="cerrarS()">Cerrar Sesion</a>' });
  }else{
    res.redirect("/")
  }
});

router.get('/usuario/cita', function(req, res, next) {
  if(req.cookies.UNI != null){
  var nombre = req.cookies.UNI;
  res.render("citas/index",{title: "Cita | Agenda", saludo: "¡Hola "+nombre+"!, aca tienes tus citas", opciones: '<a href="/usuario/categoria">Categorias</a><a href="/usuario/cita">Citas</a><a href="/usuario/tarea">Tarea</a><a href="#" data-toggle="modal" data-target="#editUser">Editar Mi Perfil</a><a href="" onclick="cerrarS()">Cerrar Sesion</a>'});
  }else{
    res.redirect("/")
  }
});

router.get('/usuario/tarea', function(req, res, next) {
  if(req.cookies.UNI != null){
  var nombre = req.cookies.UNI;
  res.render("tarea/index",{title: "Tarea | Agenda", saludo: "¡Hola "+nombre+"!, aca tienes tus tareas recientes", opciones: '<a href="/usuario/categoria">Categorias</a><a href="/usuario/cita">Citas</a><a href="/usuario/tarea">Tarea</a><a href="#" data-toggle="modal" data-target="#editUser">Editar Mi Perfil</a><a href="" onclick="cerrarS()">Cerrar Sesion</a>' });
  }else{
    res.redirect("/")
  }
});


module.exports = router;