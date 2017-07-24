import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CitaService } from "../../app/Servicios/cita-service.service";
import { ContactoService } from "../../app/Servicios/contacto-service.service";
import { CitasPage } from "./citas";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-citas',
  templateUrl: 'form-cita.html',
})

export class FormCitasPage {
    private encabezado:string
    private parametro:any
    private citaTemp:any = {idCita: 0 , lugar: "", descripcion: "", idContacto: 0, idUsuario: 0, fecha: ""}

  constructor(private _contacto:ContactoService, private toast:ToastController, public alertCtrl: AlertController,public _cita:CitaService,public navCtrl: NavController, public navParams: NavParams) {
    this.parametro =this.navParams.get("parametro")
    if(this.parametro != "nuevo"){
        this.encabezado = "Detalles de la Cita"
        console.log(this.parametro);
        
        this._cita.getACita(this.parametro).toPromise()
        .then(res=>{
            this.citaTemp = res[0]
            console.log(this.citaTemp);
        })
        .catch(res=>{
            console.log(res);
        })
    }else{
        this.encabezado = "Nueva Cita"
    }
    this._contacto.getContacto().subscribe();
}

  public guardar(){
      this.citaTemp.fecha = this.citaTemp.fechaFormat+" "+this.citaTemp.horaFormat
      console.log(this.citaTemp);
      
      this._cita.insertCita(this.citaTemp.lugar,this.citaTemp.descripcion, this.citaTemp.idContacto, this.citaTemp.fecha, (res)=>{
        this.toast.create({
            message: (res)? "Se agrego una cita" : "No se pudo agregar la cita" ,
            duration: 2300
        }).present()
        if(res){
            this.navCtrl.popTo(CitasPage)
        }else{
            this.citaTemp.idCita = "" ;
            this.citaTemp.lugar = "";
            this.citaTemp.descripcion = "";
            this.citaTemp.idContacto = "";
            this.citaTemp.fecha = "";
            this.citaTemp.fechaFormat =""
            this.citaTemp.horaFormat = ""
        }
      });
  } 
  public editar(){
      this.citaTemp.fecha = this.citaTemp.fechaFormat+" "+this.citaTemp.horaFormat
      console.log(this.citaTemp);
      
      this._cita.updateCita(this.citaTemp.idCita,this.citaTemp.lugar,this.citaTemp.descripcion, this.citaTemp.idContacto, this.citaTemp.fecha, (res)=>{
        this.toast.create({
            message: (res)? "Se edito una cita" : "No se pudo edito la cita" ,
            duration: 2300
        }).present() 
        if(res){
            
            this.navCtrl.popTo(CitasPage)
          }else{
            this.citaTemp.idCita = "" ;
            this.citaTemp.lugar = "";
            this.citaTemp.descripcion = "";
            this.citaTemp.idContacto = "";
            this.citaTemp.fecha = "";
          }
      })
  }

  public eliminar(){ 
    let prompt = this.alertCtrl.create({
      title: 'Eliminar',
      message: `¿Desea eliminar la categoria ${this.citaTemp.nombre}?` ,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this._cita.deleteCita(this.citaTemp.idCita, (res)=>{
                this.toast.create({
                    message: (res)? "Se elimino una cita" : "No se pudo edito la cita" ,
                    duration: 2300
                }).present() 
                if(res){
                    this.navCtrl.popTo(CitasPage)
                }else{
                    this.citaTemp.idCita = "" ;
                    this.citaTemp.lugar = "";
                    this.citaTemp.descripcion = "";
                    this.citaTemp.idContacto = "";
                    this.citaTemp.fecha = "";
                }
            })
          }
        }]})
         prompt.present();
    }
}