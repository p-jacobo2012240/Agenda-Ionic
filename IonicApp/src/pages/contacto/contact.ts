import { Component } from '@angular/core';
import { NavController, Gesture } from 'ionic-angular';
import { ContactoService } from '../../app/services/contacto.service'
import { ContactoForm } from './contacto.form'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contactos:any = []

  constructor(
    public navCtrl: NavController,
    public contacto:ContactoService) {
    
  }

  ionViewDidEnter(){
    this.cargarContactos()
  }

  public evenTap(event:Gesture){
    console.log(event)
  }

  public cargarContactos(){
    this.contacto.getContacto()
    .subscribe(res => {
      this.contactos = res
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.cargarContactos()
      refresher.complete();
    }, 1000);
  }
  
  public cargarFormulario(parametro){
    this.navCtrl.push(ContactoForm, {parametro})
  }

  public evento(parametro) {
    this.navCtrl.push(ContactoForm, {parametro})
  }

}