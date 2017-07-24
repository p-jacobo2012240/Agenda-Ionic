import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UsuarioService } from './usuario.service';

import 'rxjs/Rx';

@Injectable()
export class ContactoService {
  private url:string;
  private headers:Headers;

  constructor(
    private usuario:UsuarioService,
    private http:Http
  ) {
    this.url = "http://localhost:3000/api/v1/contacto";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.usuario.getToken()}`
    });
  }

  public getContactos() {
    return this.http.get(this.url, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getContacto() {
    let user = JSON.parse(this.usuario.getUsuario());
    let idPerfil = user[0].idPerfil
    let uri = `${this.url}/${idPerfil}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => {
        return res.json()
    });
  }

  public nuevoContacto(contacto:any) {
    let user = JSON.parse(this.usuario.getUsuario());
    let idPerfil = user[0].idPerfil
    contacto.id = idPerfil
    let data = JSON.stringify(contacto);
    
    return this.http.post(this.url, data, { headers: this.headers })
    .map(res => res.json());
  }

  public editarContacto(contacto:any) {
    let uri = `${this.url}/${contacto.idContacto}`;

    let data = JSON.stringify(contacto);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  public eliminarContacto(idContacto:number) {
    let uri = `${this.url}/${idContacto}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}