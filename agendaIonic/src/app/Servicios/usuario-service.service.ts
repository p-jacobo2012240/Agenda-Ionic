import { Injectable } from '@angular/core';
import {Http,RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioServiceService { 
  
  private urlUser ={
    auth: "http://localhost:3000/api/usuario/autenticar",
    all: "http://localhost:3000/api/usuario/",
    historial: "http://localhost:3000/api/historial/ID/",
    token: "http://localhost:3000/auth/"
  } ;
  usuariosList:any=[];
  historialList:Array<any>=[];
 
  constructor(private http:Http) {}
  
   public getUsuario(){ 
     return this.http.get(this.urlUser.all).map(res => {       
       this.usuariosList = res.json();
     })
   }
    public getHistorial(ID:string){ 
      var token = window.localStorage.getItem("tkn")
      let headers = new Headers({"Content-Type":"application/json","authorization":token});
      var options =  new RequestOptions({headers: headers})
     return this.http.get(this.urlUser.historial+ID,options).map(res => {       
       this.historialList = res.json();
     })
   }
   public authUser(nick:string, contrasena:string, callback){  
     if(localStorage.getItem("auth")){

        var token = window.localStorage.getItem("tkn")
        let headers = new Headers({"Content-Type":"application/json","authorization":token});
        var options =  new RequestOptions({headers: headers})

        this.http.post(this.urlUser.auth, {nick: nick, contrasena: contrasena} , options).toPromise()
        .then(res=>{
          callback(res.json())
        }).catch(res=>{
          console.log(res)
          callback({auth:false})
        })
     }else{
       callback(false);
     }

   }
   public getToken(nick:string, contrasena: string, callback){
      let headers = new Headers({"Content-Type":"application/json"});
      var options =  new RequestOptions({headers: headers})
     this.http.post(this.urlUser.token, {nick: nick, contrasena: contrasena},options).toPromise()
     .then(res=>{
       var data = res.json()
       window.localStorage.setItem("tkn",data.token );
       window.localStorage.setItem("ps",contrasena );
       window.localStorage.setItem("nk",nick );
       localStorage.setItem("auth",data.estado)
       setTimeout(()=> {
        this.updateToken()
        }, ( 55 * 60 )*1000);
       callback()
     }).catch(res=>{
       console.log(res)
       return false
     })
     
   }

   private updateToken(){
     this.http.post(this.urlUser.token,{nick: localStorage.getItem("nk"), contrasena: localStorage.getItem("ps")})
     .toPromise()
     .then(res=>{
       var data = res.json()
       if( window.localStorage.getItem("tkn") != null){
        window.localStorage.removeItem("tkn")
       }
        window.localStorage.setItem("tkn",data.token );
     }).catch(res=>{
       console.log(res)
       return false
     })
      setTimeout(()=> {
        this.updateToken()
        }, ( 55 * 60 )*1000);
   }

   getAUsuario(idUsuario:string){
     var token = window.localStorage.getItem("tkn")
      let headers = new Headers({"Content-Type":"application/json","authorization":token});
       var options =  new RequestOptions({headers: headers})

     return this.http.get("http://localhost:3000/api/usuario/"+idUsuario, options)
   }

   editProfile(data:any, callback){
      var token = window.localStorage.getItem("tkn")
      let headers = new Headers({"Content-Type":"application/json","authorization":token});
       var options =  new RequestOptions({headers: headers})
    console.log(data)
     this.http.put(this.urlUser.all+data.idUsuario,data,options).toPromise()
     .then(res=>{
        callback(res.json().Mensaje)
     })
     .catch(res=>{
       console.log(res);
        callback(false);
     })
   }

    insertProfile(data:any, callback){
    console.log(data)
     this.http.post("http://localhost:3000/api/usuario/registrar",data).toPromise()
     .then(res=>{
        callback(res.json().Mensaje)
     })
     .catch(res=>{
       console.log(res);
        callback(false);
     })
   }

  public upload(file: any) {
        let token = localStorage.getItem('tkn');
        let headers = new Headers({"authorization" : token });
        let options = new RequestOptions({'headers': headers});

        let formData = new FormData();

        formData.append('file', file, file.name);

        return this.http.post("http://localhost:3000/upload", formData, options).map(res=>res.json())

    }

}
