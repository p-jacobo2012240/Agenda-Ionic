import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UsuarioService } from './usuario.service';

import 'rxjs/Rx';

@Injectable()
export class TareaService {
  private url:string;
  private headers:Headers;

  constructor(
    private usuario:UsuarioService,
    private http:Http
  ) {
    this.url = "http://localhost:3000/api/v1/tarea";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.usuario.getToken()}`
    });
  }

  public getTareas() {
    return this.http.get(this.url, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getTarea() {
    let user = JSON.parse(this.usuario.getUsuario());
    let idPerfil = user[0].idPerfil
    let uri = `${this.url}/${idPerfil}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => {
        return res.json()
    });
  }

  public nuevoTarea(tarea:any) {
    let user = JSON.parse(this.usuario.getUsuario());
    let idPerfil = user[0].idPerfil
    tarea.id = idPerfil
    let data = JSON.stringify(tarea);
    
    return this.http.post(this.url, data, { headers: this.headers })
    .map(res => res.json());
  }

  public editarTarea(tarea:any) {
    let uri = `${this.url}/${tarea.idTarea}`;

    let data = JSON.stringify(tarea);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  public eliminarTarea(idTarea:number) {
    let uri = `${this.url}/${idTarea}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}