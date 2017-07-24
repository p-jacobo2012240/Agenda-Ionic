import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../app/Servicios/auth.service';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

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
    public toast: ToastController,
    public auth: AuthService,
    public alertCtrl: AlertController
  ) {
    if(localStorage.getItem("UDI") != null && localStorage.getItem("UNI") != null){
      navCtrl.setRoot(TabsPage)
    }
  }

  public iniciarSesion() {
    this.auth.autenticar(this.usuario)
    .subscribe(res => {

      if(res.estado) {
          this.navCtrl.setRoot(TabsPage);
      }else{
         let alert = this.alertCtrl.create({
          title: 'Oh oh!',
          subTitle: 'Usuario o contraseña incorrecto!',
          buttons: ['OK']
        });
        alert.present();
      }

    });
  }
}
