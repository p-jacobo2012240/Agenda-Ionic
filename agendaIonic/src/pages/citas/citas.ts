import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CitaService } from "../../app/Servicios/cita-service.service"
import { FormCitasPage } from "./form-cita"
/**
 * Generated class for the CitasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html',
})
export class CitasPage {

  constructor(public _cita:CitaService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this._cita.getCitas().subscribe();
  }
  changeForm(parametro){
    this.navCtrl.push(FormCitasPage, {parametro})
  }

}
