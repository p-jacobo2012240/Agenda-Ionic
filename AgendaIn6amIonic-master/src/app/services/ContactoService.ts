import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './AuthService';

import 'rxjs/Rx';

@Injectable()
export class ContactoService {
  private url:string;
  private headers:Headers;
  private contactos:any[] = [];

  constructor(
    private auth:AuthService,
    private http:Http
  ) {
    this.url = "http://localhost:3000/api/v1/contacto";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth.getToken()
    });
  }

  public getContactos() {
    return this.http.get(this.url, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getContacto(idContacto:any) {
    let uri = `${this.url}/${idContacto}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  public nuevoContacto(contacto:any) {
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
