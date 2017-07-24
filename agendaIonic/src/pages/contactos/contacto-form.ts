import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactoService } from '../../app/Servicios/contacto-service.service';
import { CategoriaService } from '../../app/Servicios/categoria-service.service';
import { ContactosPage } from './contactos';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contacto-form',
  templateUrl: 'contacto-form.html'
})
export class ContactoFormPage {
  private contacto:any = {
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    idCategoria: 1
  };
  private parametro:string;
  private encabezado:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public contactoService: ContactoService,
    public _categoria:CategoriaService,
    public alertCtrl: AlertController
  ) {
    this.parametro = this.navParams.get('parametro');
    if(this.parametro != 'nuevo') {
      this.encabezado = "Detalle Contacto";
      this.contactoService.getAContacto(this.parametro).toPromise()
      .then(res=>{
        this.contacto = res[0];
      })
      .catch(res=>{
        console.log(res)
      })
    } else {
      this.encabezado = "Nuevo Contacto";
    }
    this._categoria.getCategorias().subscribe();
  }

  public guardar() {
    this.contactoService.insertContacto(this.contacto.nombre, this.contacto.apellido, this.contacto.telefono, this.contacto.correo, this.contacto.idCategoria,(res)=>{
      this.toast.create({
        message: (res)?"Se agrego el contacto con exito" : "Oh no!, hemos tenido problemas en agregarlo",
        duration: 2300
      }).present();
      if(res) {
         this.navCtrl.getPrevious()
      } else {
        this.contacto.nombre = "";
        this.contacto.apellido = "";
        this.contacto.correo = "";
        this.contacto.telefono = "";
        this.contacto.idCategoria = 0;
      }
    });
  }

  public eliminar(){
    let prompt = this.alertCtrl.create({
      title: 'Eliminar',
      message: `¿Desea eliminar el contacto ${this.contacto.nombre}?` ,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.contactoService.deleteContacto(this.contacto.idContacto, (res)=>{
            this.toast.create({
                    message: (res)?"Se elimino el contacto con exito" : "Oh no!, hemos tenido problemas en eliminarlo",
                    duration: 2300
                  }).present();
              if(res){
                  this.contacto.nombre = "";
                  this.contacto.apellido = "";
                  this.contacto.correo = "";
                  this.contacto.telefono = "";
                  this.contacto.idCategoria = 0;
                  this.navCtrl.getPrevious()
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }

  public editar(){
    this.contactoService.updateContacto(this.contacto.idContacto,this.contacto.nombre, this.contacto.apellido, this.contacto.telefono, this.contacto.correo, this.contacto.idCategoria,(res)=>{
      this.toast.create({
        message: (res)?"Se edito el contacto con exito" : "Oh no!, hemos tenido problemas en editarlo",
        duration: 2300
      }).present();
      if(res) {
         this.navCtrl.popTo(ContactoFormPage)
      } else {
        this.contacto.nombre = "";
        this.contacto.apellido = "";
        this.contacto.correo = "";
        this.contacto.telefono = "";
        this.contacto.idCategoria = 0;
      }
    });
  }
}