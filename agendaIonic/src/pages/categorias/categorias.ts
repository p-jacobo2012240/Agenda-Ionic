import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from "../../app/Servicios/categoria-service.service";
import { FormCategoriasPage } from "./form-categoria";
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public _categoria:CategoriaService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this._categoria.getCategorias().subscribe();
  }
  changeForm(parametro){
    this.navCtrl.push(FormCategoriasPage, {parametro})
  }
}
