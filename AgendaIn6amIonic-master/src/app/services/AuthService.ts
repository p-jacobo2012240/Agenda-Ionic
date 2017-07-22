import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private url:string;
  private headers:Headers;

  constructor(private http:Http) {
    this.url = "http://localhost:3000";
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  public autenticacion(usuario:any) {
    let uri = `${this.url}/auth/`;
    let data = JSON.stringify(usuario);

    return this.http.post(uri, data, { headers: this.headers})
    .map(res => {
      if(res.json().estado) {
        this.setToken(res.json().token);
        this.setUsuario({
          nick: res.json().nick,
          idUsuario: res.json().idUsuario
        });
      }
      return res.json();
    });
  }

  private setToken(token:string) {
    localStorage.setItem('TOKEN', token);
  }
  public getToken():string {
    return localStorage.getItem('TOKEN');
  }
  private setUsuario(usuario:any) {
    localStorage.setItem('USUARIO', JSON.stringify(usuario));
  }
  public getUsuario():any {
    return localStorage.getItem('USUARIO');
  }
  public isLogged():boolean {
    if(localStorage.getItem('TOKEN')) {
      return true;
    }
    return false;
  }
}
