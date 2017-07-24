console.log("Se inicio el JS")
var app = angular.module('agenda', ['ngCookies']);

app.controller("userController", ["$scope","$http",'$cookies' , function($scope, $http, $cookies){

     //Cargar datos en tablas
    function getData(){   
     $http.get("../api/categoria/ID/"+$cookies.get('UDI')).then(function(response){
          $scope.categoryList = response.data;
     })
     $http.get("../api/contacto/ID/"+$cookies.get('UDI')).then(function(response){
         $scope.userList = response.data;
     })
    }

    //Cargar datos en Gestions
    
    $scope.setCont = function(cont){
         $scope.ContID =cont.idContacto;
         $scope.nombreUS = cont.nombre
         $scope.apellidoUS = cont.apellido
         $scope.telefonoUS = cont.telefono
         $scope.correoUS = cont.correo
         $scope.categoriaUS = {idCategoria: cont.idCategoria, nombre: cont.nombreCategoria}
    }   

    //Operaciones de gestion
    $scope.gestionUS=function(OperaID){
        var data = {
            idUsuario: $cookies.get("UDI"),
            idContacto: $scope.ContID,
            nombre: $scope.nombreUS,
            apellido: $scope.apellidoUS,
            telefono: $scope.telefonoUS,
            correo: $scope.correoUS,
            idCategoria: $scope.categoriaUS.idCategoria,
            urlIMG : ""
        }
       switch (OperaID) {
           case 1:
              var formu = new FormData()
              formu.append("urlIMG", $("#urlIMGUS")[0].files[0])
              console.log(formu);
              console.log("Iniciando Llamada")
              $http.post('../api/contacto/cargar',formu)
              .then(function(response){
                console.log("Llamada culminada: ")
                console.log(response);
                if(response.data.value){                     
                    data.urlIMG = response.data.urlIMG;
                    $http({
                        method: 'post',
                        url: '../api/contacto',
                        data: data,
                        headers: {"Content-Type":"application/json"}
                    }).then(function(response){
                        console.log(response)
                        if(response.data.Mensaje == true){            
                            $("#closeAGUSMO").click();
                        }else{
                            $scope.error="Error en el API para Contactos"
                        }
                    })
                }
            })         
               break;
           case 2:
               $http({
                    method: 'put',
                    url: '../api/contacto/'+data.idContacto,
                    data: data,
                    headers: {"Content-Type":"application/json"}
                }).then(function(response){
                    console.log(response)
                        if(response.data.Mensaje == true){
                            $("#closeAGUSMO").click();
                        }else{
                            $scope.error="Error en el API para Contactos"
                        }
                })
               break;
            case 3:
               $http({
                    method: 'delete',
                    url: '../api/contacto',
                    data: data,
                    headers: {"Content-Type":"application/json"}
                }).then(function(response){
                    console.log(response)
                        if(response.data.Mensaje == true){
                            
                            $("#closeAGUSMO").click();
                        }else{
                            $scope.error="Error en el API para Contactos"
                        }
                })
               break;
       }
       getData()
    }
    getData() 
           
}]);

app.controller("autenticarUS",['$scope','$http','$cookies', function($scope,$http,$cookies){

     $scope.autenticar = function(){
         console.log($scope.nickAUTH)
         console.log($http)
         var data = {
             nick: $scope.nickAUTH,
             contrasena: $scope.passAUTH
         }

         $http({
           method: 'post',
           url: '../api/usuario/autenticar',
           data: data,
           headers: {"Content-Type":"application/json"}
        }).then(function(response){
            if(response.data.auth == true){
                $scope.showErrorAGMO = false;
                $cookies.put("UDI", response.data.data.idUsuario);
                $cookies.put("UNI", response.data.data.nick);
                window.location = response.data.location
            }else{
                $scope.showErrorAGMO = true;
                $scope.errorAGMO=response.data.Mensaje;
            }
           })
     }
}]);

app.controller("categoryController", ["$scope","$http","$cookies", function($scope,$http,$cookies){
    $http.get("../api/categoria/ID/"+$cookies.get('UDI')).then(function(response){
          $scope.categoryList = response.data;
     })
     $scope.setCate = function(CATE){
         $scope.cateID = CATE.idCategoria;
         $scope.nombreCA = CATE.nombre;
         $scope.idCA = CATE.idUsuario;
     }
     //Operaciones de gestion
    $scope.gestionCA=function(OperaID){
        var data = {
           idCategoria: $scope.cateID,
           nombre: $scope.nombreCA,
           idUsuario: $cookies.get("UDI")
        }
        var url = "../../api/categoria/"
        var method = "post"
       switch (OperaID) {
           case 2:
            method= 'put'
            url = url+data.idCategoria
            break;
           case 3:
            method= 'delete'
            break;
       }
        console.log(data)
        console.log("URL: "+url+" Method:"+method)
        $http({
            method: method,
            url: url ,
            data: data,
            headers: {"Content-Type":"application/json"}
        }).then(function(response){
            console.log(response);
            if(response.data.Mensaje == true){          
              $("#closeAGUSMO").click();
            }else{
              $scope.error="Error en el API para Contactos"
            }
        })
      $http.get("../api/categoria/ID/"+$cookies.get('UDI')).then(function(response){
          $scope.categoryList = response.data;
     })
    }
    $scope.cerrarS = function(){
        $cookies.remove("UDI")
        $cookies.remove("UNI")
        window.location ="http://localhost:3000"
    }

}]);

app.controller("registrarUS",["$scope","$http","$cookies", function($scope,$http,$cookies){
    $scope.registrar = function(){
        var data = {
            nick: $scope.nickUS,
            contrasena: $scope.passUS
        }
        $http({
            method: "post",
            url: "../api/usuario/",
            headers: "Content-Type/application-json",
            data: data
        }).then(function(response){
            if(response.data.Mensaje == true){
                $scope.Mensaje= "¡Te has registrado correctamente!, ahora ve a iniciar sesion"
            }else if(response.data.Mensaje != true && response.data.Mensaje != false ){
                $scope.Mensaje = response.data.Mensaje;
            }else{
                $scope.Mensaje= "Parece que tenemos problemas, Ha ocurrido un error al registrarte, recarga la pagina e intenta de  nuevo"
            }
        });
    }

}]);

app.controller("citasController",["$scope", "$http", "$cookies", function($scope, $http, $cookies){
    function getData(){
        $http.get("../../api/citas/ID/"+$cookies.get("UDI")).then(function(response){
            $scope.citasList = response.data;
            console.log($scope.citasList)
        });
        
        $http.get("../../api/contacto/ID/"+$cookies.get("UDI")).then(function(response){
            $scope.contactosList = response.data;
            console.log($scope.contactosList)
        });
    }
     $scope.setCit = function(CATE){
        $scope.citaID = CATE.idCita;
        $scope.lugarCI = CATE.lugar;
        $scope.descripcionCI = CATE.descripcion;
        $scope.fechaCI= CATE.fecha
     }
    $scope.gestionCI = function(OperaID){
       
        var url = "../../api/citas/"
        var method = "post"
       switch (OperaID) {
           case 1:
             var data = {
                lugar: $scope.lugarCI,
                descripcion: $scope.descripcionCI,
                idContacto: ($scope.contactoCI.idContacto != null )?$scope.contactoCI.idContacto :0,
                fecha: $scope.fechaCI,
                idUsuario: $cookies.get("UDI")
                }
            break;
           case 2:
            var data = {
                idCita: $scope.citaID,
                lugar: $scope.lugarCI,
                descripcion: $scope.descripcionCI,
                idContacto: ($scope.contactoCI.idContacto != null )?$scope.contactoCI.idContacto :0,
                fecha: $scope.fechaCI,
                idUsuario: $cookies.get("UDI")
                }
            method= 'put'
            url = url+data.idCita
            break;
           case 3:
            method= 'delete'
            var data= {idCita: $scope.citaID}
            break;
       }
        console.log(data)
        console.log(method+" "+url)
        $http({
            method: method,
            url: url ,
            data: data,
            headers: {"Content-Type":"application/json"}
        }).then(function(response){
            console.log(response);
            if(response.data.Mensaje == true){          
              $("#closeAGUSMO").click();
            }else{
              $scope.error="Error en el API para Contactos"
            }
        })
     getData()
    
    }
    getData()
}])

app.controller("tareasController",["$scope", "$http", "$cookies", function($scope, $http, $cookies){
    function getData(){
        $http.get("../../api/tarea/ID/"+$cookies.get("UDI")).then(function(response){
            $scope.tareasList = response.data;
            console.log($scope.tareasList)
        });
        
        $http.get("../../api/prioridad").then(function(response){
            $scope.prioridadList = response.data;
            console.log($scope.prioridadList)
        });

         $http.get("../../api/categoria/ID/"+$cookies.get("UDI")).then(function(response){
            $scope.categoriaList = response.data;
            console.log($scope.categoriaList)
        });
    }
     $scope.setTA = function(CATE){
         console.log(CATE)
        $scope.tareaID = CATE.idTarea
        $scope.nombreTA = CATE.nombre
        $scope.descripcionTA = CATE.descripcion
        $scope.categoriaTA ={idCategoria:CATE.idCategoria} 
        $scope.prioridadTA ={idPrioridad: CATE.idPrioridad}
        $scope.fechaTA = CATE.fecha
     }

    $scope.gestionTA = function(OperaID){
       
        var url = "../../api/tarea/"
        var method = "post"
       switch (OperaID) {
           case 1:
             var data = {
                nombre: $scope.nombreTA,
                descripcion: $scope.descripcionTA,
                idCategoria: $scope.categoriaTA.idCategoria,
                idPrioridad: $scope.prioridadTA.idPrioridad,
                idUsuario: $cookies.get("UDI"),
                fecha: $scope.fechaTA
                }
            break;
           case 2:
            var data = {
                idTarea: $scope.tareaID,
                nombre: $scope.nombreTA,
                descripcion: $scope.descripcionTA,
                idCategoria: $scope.categoriaTA.idCategoria,
                idPrioridad: $scope.prioridadTA.idPrioridad,
                idUsuario: $cookies.get("UDI"),
                fecha: $scope.fechaTA
                }
            method= 'put'
            url = url+data.idTarea
            break;
           case 3:
            method= 'delete'
            var data= {idTarea: $scope.tareaID}
            break;
       }
        console.log(data)
        console.log(method+" "+url)
        $http({
            method: method,
            url: url ,
            data: data,
            headers: {"Content-Type":"application/json"}
        }).then(function(response){
            console.log(response);
            if(response.data.Mensaje == true){          
              $("#closeAGUSMO").click();
            }else{
              $scope.error="Error en el API para Contactos"
            }
        })
     getData()
    
    }
    getData()
}])

app.controller("editUser",["$scope", "$http", "$cookies", function($scope, $http, $cookies){
       
     $scope.setTA = function(CATE){
        $http.get("../../api/usuario/"+$cookies.get("UDI")).then(function(response){
            $scope.nickUS = response.data[0].nick;
            $scope.passUS = response.data[0].contrasena;
            $scope.udiUS = response.data[0].idUsuario;
        });
     }

    $scope.editarUS = function(){

        var data ={
            nick: $scope.nickUS,
            contrasena: $scope.passUS,
            idUsuario: $scope.udiUS
        }
        $http({
            method: "put",
            url: "../../api/usuario/"+data.idUsuario ,
            data: data,
            headers: {"Content-Type":"application/json"}
        }).then(function(response){
            console.log(response);
            if(response.data.Mensaje == true){
                $cookies.put("UDI",data.idUsuario)         
                $cookies.put("UNI",data.nick)          
              $("#closeeditUS").click();
            }else{
              $scope.error="Error en el API para uUsario"
            }
        })
    }
}])

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function cerrarS(){
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
        window.location ="http://localhost:3000"
}