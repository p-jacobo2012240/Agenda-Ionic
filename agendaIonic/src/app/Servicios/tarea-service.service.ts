import { Injectable } from '@angular/core';
import { Http, Response ,RequestOptions,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {CookieService} from "ngx-cookie"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TareaService {
    tareaList:Array<any>= []
    private HEADER = new RequestOptions({headers: new Headers({"Content-Type":"application/json","authorization":window.localStorage.getItem("tkn")})});
    constructor(private http: Http, private _cookie:CookieService) { }
    
    getTareas(){
        return this.http.get("http://localhost:3000/api/tarea/ID/"+this._cookie.get("UDI"),this.HEADER).map(res=>this.tareaList = res.json())
    }

    getATareas(id:string){
        return this.http.get("http://localhost:3000/api/tarea/ID/"+this._cookie.get("UDI"),this.HEADER).map(res=>res.json())
    }
    insertTarea(nombre:string, descripcion:string, idCategoria:string, idPrioridad:string, fecha:any, callback){
        this.http.post("http://localhost:3000/api/tarea", 
        {nombre:nombre, descripcion: descripcion, idCategoria: idCategoria, idPrioridad:idPrioridad, idUsuario: this._cookie.get("UDI"), fecha: fecha},this.HEADER).toPromise()
        .then(res=>{
            callback(res.json().Mensaje)
        }).catch(res=>{
            console.log(res)
            callback(false);
        })
    }

    updateTarea(idTarea:string ,nombre:string, descripcion:string, idCategoria:string, idPrioridad:string, fecha:any, callback){
        this.http.put("http://localhost:3000/api/tarea/"+idTarea, 
        {idTarea: idTarea,nombre:nombre, descripcion: descripcion, idCategoria: idCategoria, idPrioridad:idPrioridad, idUsuario: this._cookie.get("UDI"), fecha: fecha},this.HEADER).toPromise()
        .then(res=>{
            callback(res.json().Mensaje)
        }).catch(res=>{
            console.log(res)
            callback(false);
        })
    }
    deleteTarea(idTarea:string, callback){
        console.log("http://localhost:3000/api/tarea/"+idTarea)
        this.http.delete("http://localhost:3000/api/tarea/"+idTarea,this.HEADER).toPromise()
        .then(res=>{            
            callback(res.json().Mensaje)
        }).catch(res=>{
            console.log(res)
            callback(false);
        })
    }
}