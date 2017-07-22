import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactoService } from '../../app/services/ContactoService';
import { ContactoFormPage } from './contacto-form';

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html'
})
export class ContactosPage {
  private contactos:any[] = [];

  constructor(
    public navCtrl: NavController,
    public contactoService: ContactoService
  ) {
    this.inicializar();
  }

  private inicializar() {
    this.contactoService.getContactos()
    .subscribe(contactos => this.contactos = contactos);
  }

  public verFormulario(parametro:any) {
    this.navCtrl.push(ContactoFormPage, { parametro });
  }
}
