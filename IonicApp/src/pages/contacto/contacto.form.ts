import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactoService } from '../../app/services/contacto.service'

@Component({
  selector: 'page-contactoForm',
  templateUrl: 'contacto.form.html'
})
export class ContactoForm {
    private titulo:string
    private parametro:any
    private estado:any = false

    private contacto:any = {
        nombre: '',
        apellido: '',
        telefono: '',
        correo: ''
    }

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastController: ToastController,
        public service: ContactoService,
    ) {
        this.parametro = this.navParams.get('parametro')

        if (this.parametro == 'nuevo'){
            this.titulo = 'Nuevo Contacto'
        } else {
            this.titulo = this.parametro.nombre
            this.contacto = this.parametro
            this.estado = true
        }

    }

    public agregar(){
        this.service.nuevoContacto(this.contacto)
        .subscribe(res => {
            this.toastController.create({
                message: 'contacto agregado',
                duration: 1000
            }).present()
        })

        setTimeout( () => {
            this
            this.navCtrl.pop()
        }, 1500)
    }
    public modificar(){
        this.service.editarContacto(this.contacto)
        .subscribe(res => {
            this.toastController.create({
                message: 'contacto modificado',
                duration: 1000
            }).present()
        })

        setTimeout( () => {
            this.navCtrl.pop()
        }, 1500);
    }
    public eliminar(){
        this.service.eliminarContacto(this.contacto.idContacto)
        .subscribe(res => {
            this.toastController.create({
                message: 'Contacto Eliminado',
                duration: 1000
            }).present()
        })

        setTimeout( () => {
            this.navCtrl.pop()
        }, 1500);
    }

}
