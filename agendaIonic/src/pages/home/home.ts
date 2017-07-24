import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TareaService } from "../../app/Servicios/tarea-service.service"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public _tarae:TareaService) {
    this._tarae.getTareas().subscribe()
  }
  public usuario = localStorage.getItem("UNI")

}
