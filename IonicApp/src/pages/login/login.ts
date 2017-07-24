import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular'
import { UsuarioService} from '../../app/services/usuario.service'
import { TabsPage } from '../../pages/tabs/tabs'
import { SignupPage } from '../signup/signup'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private usuario:any = {
    nick: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public service: UsuarioService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public iniciarSesion(){
    this.service.autenticacion(this.usuario)
    .subscribe(res => {
      if (!res.estado){
        this.toast.create({
          message: `usuario o contrasena invalida`,
          duration: 1500
        }).present() 
        this.usuario.nick = '',
        this.usuario.password = ''
      } else {
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000
        });
        loader.present();
        setTimeout(() =>{
          this.navCtrl.setRoot(TabsPage, {}, {animate: true})
        }, 1500)
      }
    }) 
  }

  public registrar(){
    this.navCtrl.push(SignupPage, {}, {animate:true})
  }

}
