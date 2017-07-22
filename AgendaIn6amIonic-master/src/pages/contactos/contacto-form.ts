import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactoService } from '../../app/services/ContactoService';
import { ContactosPage } from './contactos';

@Component({
  selector: 'page-contacto-form',
  templateUrl: 'contacto-form.html',
})
export class ContactoFormPage implements OnInit {
  private parametro:string;
  private titulo:string;

  private contacto:any = {
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    idCategoria: 0,
    idContacto: 0,
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public contactoService: ContactoService
  ) {

    this.parametro = this.navParams.get('parametro');

    if(this.parametro != "nuevo") {
      this.contactoService.getContacto(this.parametro)
      .subscribe(res => this.contacto = res);
      this.titulo = "Detalle Contacto"
    } else {
      this.titulo = "Nuevo Contacto";
    }
  }

  ngOnInit() {}

  public guardar() {
    this.contactoService.nuevoContacto(this.contacto)
    .subscribe(res => {
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();

      setTimeout(() => {
        if(res.estado) {
          this.navCtrl.push(ContactosPage);
        } else {
          this.contacto.nombre = "";
          this.contacto.apellido = "";
          this.contacto.direccion = "";
          this.contacto.telefono = "";
          this.contacto.idCategoria = 0;
        }
      }, 3000);

    });
  }
}
