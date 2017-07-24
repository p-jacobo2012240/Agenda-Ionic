import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UsuarioService} from '../../app/services/usuario.service'
import { TabsPage } from '../../pages/tabs/tabs'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  usuario:any = {
    nombre: '',
    apellido: '',
    correo: '',
    nick: '',
    password: '',
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public loadingCtrl: LoadingController,
    public service: UsuarioService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  public iniciarSesion(){
    this.service.registrar(this.usuario)
    .subscribe(res => {
      let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000
        });
        loader.present();
        setTimeout(() =>{
          this.navCtrl.setRoot(TabsPage, {}, {animate: true})
        }, 1500)
    })
  }

  public login(){
    this.navCtrl.pop()
  }

}
