import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../app/services/AuthService';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private usuario:any = {
    nick:"",
    contrasena: ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public loading: LoadingController,
    public auth:AuthService
  ) {
  }

  ionViewDidLoad() {

  }

  public iniciarSesion() {

    this.auth.autenticacion(this.usuario)
    .subscribe(res => {

      this.toast.create({
        message: res.mensaje,
        duration: 3000
      }).present();

      if(res.estado) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.usuario.nick = "";
        this.usuario.contrasena = "";
      }
    });
  }
}
