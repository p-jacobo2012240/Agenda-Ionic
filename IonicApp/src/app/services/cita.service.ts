import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UsuarioService } from './usuario.service';

import 'rxjs/Rx';

@Injectable()
export class CitaService {
  private url:string;
  private headers:Headers;

  constructor(
    private usuario:UsuarioService,
    private http:Http
  ) {
    this.url = "http://localhost:3000/api/v1/cita";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.usuario.getToken()}`
    });
  }

  public getCitas() {
    return this.http.get(this.url, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getCita() {
    let user = JSON.parse(this.usuario.getUsuario());
    let idPerfil = user[0].idPerfil
    let uri = `${this.url}/${idPerfil}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => {
        return res.json()
    });
  }

  public nuevoCita(cita:any) {
    let data = JSON.stringify(cita);
    
    return this.http.post(this.url, data, { headers: this.headers })
    .map(res => res.json());
  }

  public editarCita(cita:any) {
    let uri = `${this.url}/${cita.idCita}`;

    let data = JSON.stringify(cita);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  public eliminarCita(idCita:number) {
    let uri = `${this.url}/${idCita}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}