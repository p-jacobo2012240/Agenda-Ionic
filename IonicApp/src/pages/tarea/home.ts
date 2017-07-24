import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { TareaService } from '../../app/services/tarea.service'
import { UsuarioService } from '../../app/services/usuario.service'
import { HomeForm } from './home.form'
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tareas:any = []

  constructor(
    public navCtrl: NavController,
    public service: TareaService,
    public usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidEnter(){
    this.cargarTareas()
  }

  public cargar(parametro){
    this.navCtrl.push(HomeForm, {parametro})
  }

  public cargarTareas(){
    this.service.getTarea()
    .subscribe( res => {
      this.tareas = res
    })
  }
public presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Cerrar Session',
    message: '¿Seguro que desea cerrar la session?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.usuarioService.destroyeToken()
          let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1000
          });
          loader.present();
          setTimeout(() => {
            this.navCtrl.setRoot(LoginPage, {}, {animate: true})            
          }, 1500);
        }
      }
    ]
  });
  alert.present();
}

}
