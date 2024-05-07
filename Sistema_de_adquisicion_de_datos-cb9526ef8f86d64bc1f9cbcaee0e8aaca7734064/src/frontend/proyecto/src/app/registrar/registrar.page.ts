import { Component,OnDestroy, OnInit } from '@angular/core';
import { RegistrarService } from '../services/registrar.service';
import {Bateadora}from '../interfaces/bateadora';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit, OnDestroy{
  id:any;
  equipos:any;
  bateadora: Bateadora ={
    idBateadora : 0 ,
    numeroBateadora:"",
    jefeEquipo: "",
    supervisor:""
  };
  constructor(private _registrarServices: RegistrarService, private alertController: AlertController) { 
    this.id = 0;

  }
 
  ngOnInit() {
    this._registrarServices.getEquiposRegistrados()
    .then((registro)=>{
      this.equipos = registro;
      console.log("equipo registrado", registro);
      this.id = registro.idbateadora;
    })
    .catch((error)=>console.log(error));
  }
  
  ngOnDestroy(): void {

  }

  async guardar(){ 
    const alert = await this.alertController.create({
      header:'Ingresar equipo de trabajo',
      inputs:[{
        name:"numeroBateadora",
        type:"text",
        placeholder:"Ingresar numero de equipo",
      },
      {
        name:"jefeEquipo",
        type:"text",
        placeholder:"Ingresa el nombre del jefe de equipo",
      },
      {
        name:"supervisor",
        type:"text",
        placeholder:"Ingresa el nombre del supervisor",
      }
    ],
      buttons:[
        {
        text:'Cancelar',
        role:'cancel',
        handler:()=>{console.log('Accion cancelada');}
        },
        {
          text:'Aceptar',
          handler:(data)=>{console.log('valor ingresado ',data.linea);
          console.log("jefe equipo: ", data.jefeEquipo," numero de bateadora: ",data.numeroBateadora," supervisor",data.supervisor);
          this.bateadora.numeroBateadora = data.numeroBateadora;
          this.bateadora.jefeEquipo = data.jefeEquipo;
          this.bateadora.supervisor =data.supervisor;
          this.accionGuardar(this.bateadora);
          
          }
        } 
      ]
    });
    
    await alert.present();
  }
  accionGuardar(data:Bateadora){
    this._registrarServices.setCargarEquipo(data)
      .then(()=>{ 
        alert("Se a agregado el equipo")
      })
      .catch((error)=>{console.log(error)});
      window.location.reload();
  }

  modificar(dato:any){

  }

  eliminar(dato:any){
    this.bateadora.idBateadora = dato;
    this._registrarServices.setEliminiarEquipos(this.bateadora)
    .then((valor)=>{
      alert("Se elimino el equipo")
    })
    .catch((error)=>{console.log(error)});
    window.location.reload();
  }
}
