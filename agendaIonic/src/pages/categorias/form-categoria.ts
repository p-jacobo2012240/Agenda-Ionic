import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CategoriaService } from "../../app/Servicios/categoria-service.service";
import { CategoriasPage } from "../categorias/categorias";
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-categorias',
  templateUrl: 'form-categoria.html',
})
export class FormCategoriasPage {
    private encabezado:string
    private parametro:any
    private categoriaTemp:any = {idCategoria:0 , nombre: ""}

  constructor(private toast:ToastController, public alertCtrl: AlertController,public _categoria:CategoriaService,public navCtrl: NavController, public navParams: NavParams) {
    this.parametro =this.navParams.get("parametro")
    if(this.parametro != "nuevo"){
        this.encabezado = "Detalles de la Categoria"
        this._categoria.getACategorias(this.parametro).toPromise()
        .then(res=>{
            console.log(res);
            this.categoriaTemp = res[0]
        })
        .catch(res=>{
            console.log(res);
        })
    }else{
        this.encabezado = "Nueva Categoria"
    }
}

  ionViewWillEnter() {
    this._categoria.getCategorias().subscribe();
  }

  public nuevaCat(){
      this._categoria.insertCategoria(this.categoriaTemp.nombre, (res)=>{
        this.toast.create({
            message: (res)? "Se agrego una categoria" : "No se pudo agregar la categoria" ,
            duration: 2300
        }).present()
        if(res){
            this.navCtrl.getPrevious()
        }else{
            
            this.categoriaTemp.nombre = ""
            this.categoriaTemp.idCategoria = 0;
        }
      });
  } 
  public editCat(){
      this._categoria.updateCategoria(this.categoriaTemp.nombre, this.categoriaTemp.idCategoria,  (res)=>{
        this.toast.create({
            message: (res)? "Se edito una categoria" : "No se pudo edito la categoria" ,
            duration: 2300
        }).present()  
        if(res){
            
            this.navCtrl.getPrevious()
          }else{
            this.categoriaTemp.nombre = ""
            this.categoriaTemp.idCategoria = 0;
          }
      })
  }

  public deleteCat(){ 
    let prompt = this.alertCtrl.create({
      title: 'Eliminar',
      message: `¿Desea eliminar la categoria ${this.categoriaTemp.nombre}?` ,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this._categoria.deleteCategoria(this.categoriaTemp.idCategoria, (res)=>{
                console.log(res);
                this.toast.create({
                    message: (res)? "Se elimino una categoria" : "No se pudo edito la categoria" ,
                    duration: 2300
                }).present() 
                if(res){
                    this.navCtrl.getPrevious()
                }else{
                    this.categoriaTemp.nombre = ""
                    this.categoriaTemp.idCategoria = 0;
                }
            })
          }
        }]})
         prompt.present();
    }
}