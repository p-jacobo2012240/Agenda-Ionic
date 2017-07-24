import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CitaService } from '../../app/services/cita.service'
import { ContactoService } from '../../app/services/contacto.service'

@Component({
  selector: 'page-citaForm',
  templateUrl: 'cita.form.html'
})
export class CitaForm {

  cita:any = {
    descripcion: '',
    fecha: '',
    lugar: '',
    id: ''
  }

    private titulo:string
    private parametro:any
    private status:any = false
    private contactos:any = []

  constructor(
    public navCtrl: NavController,
    public service: CitaService,
    public contactoService: ContactoService,
    public navParams: NavParams,
    public toast: ToastController) {
      this.parametro = this.navParams.get('parametro')

      if (this.parametro == 'nuevo'){
          this.titulo = 'Nueva Cita'
      } else {
          this.titulo = this.parametro.titulo
          this.cita = this.parametro
          this.cita.id = this.cita.idContacto
          this.status = true
      }

      this.contactoService.getContacto()
      .subscribe(res => {
          this.contactos = res
      })
  }

  public agregar(){
    this.service.nuevoCita(this.cita)
        .subscribe(res => {
          this.toast.create({
            message: 'Cita Agregada',
            duration: 1000
          }).present()
        })

    setTimeout( () => {
        this.navCtrl.pop()
    }, 1500);
  }

  public modificar(){
    this.service.editarCita(this.cita)
      .subscribe(res => {
        this.toast.create({
          message: 'Cita Modificada',
          duration: 1000
        }).present()
      })

    setTimeout( () => {
      this.navCtrl.pop()
    }, 1500);
  }

  public eliminar(){
    this.service.eliminarCita(this.cita.idCita)
      .subscribe(res => {
        this.toast.create({
          message: 'Cita Eliminada',
          duration: 1000
        }).present()
      })

    setTimeout( () => {
      this.navCtrl.pop()
    }, 1500);
  }

}
