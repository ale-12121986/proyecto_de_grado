import { Component, OnInit } from '@angular/core';
import { RegistrarService } from '../services/registrar.service';
import { AlertController } from '@ionic/angular';
import { Bateadora } from '../interfaces/bateadora';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  id:any;
  equipos:any;
  bateadora: Bateadora ={
    idBateadora : 0 ,
    numeroBateadora:"",
    jefeEquipo: "",
    supervisor:""
  };
  constructor(private _registrarServices: RegistrarService, private alertController: AlertController, private toastController: ToastController) { 
    this.id = 0;
  }

  ngOnInit() {
    this._registrarServices.getEquiposRegistrados()
    .then((registro)=>{
      this.equipos = registro;
      this.id = registro.idbateadora;
    })
    .catch((error)=>console.log(error));
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
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'bottom' // Position of the toast on the screen
    });
    toast.present();
  }
  async modificar(dato:any){
    const alert = await this.alertController.create({
      header:'Modifica equipo de trabajo',
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
          this.bateadora.idBateadora = dato;
          this.bateadora.numeroBateadora = data.numeroBateadora;
          this.bateadora.jefeEquipo = data.jefeEquipo;
          this.bateadora.supervisor =data.supervisor;
          // this.accionGuardar(this.bateadora);
          this._registrarServices.setModificarEquipos(this.bateadora)
          .then(()=>{ 
            this.presentToast("Se ha modificado el equipo");
          })
          .catch((error)=>{console.log(error)});
          // window.location.reload();
          }
        } 
      ]
    });
    await alert.present();
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
