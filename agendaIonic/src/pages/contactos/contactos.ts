import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactoService } from '../../app/Servicios/contacto-service.service';
import { CategoriaService } from '../../app/Servicios/categoria-service.service';
import { ContactoFormPage } from './contacto-form';

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html'
})
export class ContactosPage {
    constructor(
    public navCtrl: NavController,
    public contactoService: ContactoService,
    public _categoria:CategoriaService
    ) {
      this.inicializar();
    }

    ionViewWillEnter(){
      this.inicializar()
    }
    
  private inicializar() {
    this.contactoService.getContacto().subscribe();
   
  }

  public verForm(parametro) {
    this.navCtrl.push(ContactoFormPage, {parametro});
  }

}
