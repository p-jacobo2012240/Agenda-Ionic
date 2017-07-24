import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TareaService } from '../../app/services/tarea.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.form.html'
})
export class HomeForm {

  tarea:any = {
    titulo: '',
    descripcion: '',
    fin: '',
    estado: ''
  }

    private titulo:string
    private parametro:any
    private status:any = false

  constructor(
    public navCtrl: NavController,
    public service: TareaService,
    public navParams: NavParams,
    public toast: ToastController) {
      this.parametro = this.navParams.get('parametro')

      if (this.parametro == 'nuevo'){
          this.titulo = 'Nueva Tarea'
      } else {
          this.titulo = this.parametro.titulo
          this.tarea = this.parametro
          this.status = true
      }
  }

  public agregar(){
      this.service.nuevoTarea(this.tarea)
        .subscribe(res => {
          this.toast.create({
            message: 'Tarea Agregada',
            duration: 1000
          }).present()
        })

      setTimeout( () => {
        this.navCtrl.pop()
      }, 1500);
  }

  public modificar(){
    this.service.editarTarea(this.tarea)
      .subscribe(res => {
        this.toast.create({
          message: 'Tarea Modificada',
          duration: 1000
        }).present()
      })

    setTimeout( () => {
      this.navCtrl.pop()
    }, 1500);
  }

  public eliminar(){
    this.service.eliminarTarea(this.tarea.idTarea)
      .subscribe(res => {
        this.toast.create({
          message: 'Tarea Eliminada',
          duration: 1000
        }).present()
      })

    setTimeout( () => {
      this.navCtrl.pop()
    }, 1500);
  }

}
