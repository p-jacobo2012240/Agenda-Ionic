import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CitaService } from '../../app/services/cita.service'
import { ContactoForm } from '../contacto/contacto.form'
import { CitaForm } from './cita.form'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public citas:any = []

  constructor(public navCtrl: NavController,
  public service:CitaService) {

  }

  ionViewDidEnter(){
    this.cargarCitas()
  }

  public cargarCitas(){
    this.service.getCita()
    .subscribe(res => {
      this.citas = res[0]
    })
  }

  public mostarContacto(item){
    let parametro = {
      nombre: item.nombre,
      apellido: item.apellido,
      telefono: item.telefono,
      correo: item.correo,
      idContacto: item.idContacto
    }

    this.navCtrl.push(ContactoForm, {parametro})
  }

  public cargar(parametro){
    this.navCtrl.push(CitaForm, {parametro})
  }

}
