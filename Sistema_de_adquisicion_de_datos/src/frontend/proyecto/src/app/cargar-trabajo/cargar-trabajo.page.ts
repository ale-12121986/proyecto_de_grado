import { Component, OnInit } from '@angular/core';
import { Trabajo } from '../interfaces/trabajo';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CargarTrabajoService } from '../services/cargar-trabajo.service';

@Component({
  selector: 'app-cargar-trabajo',
  templateUrl: './cargar-trabajo.page.html',
  styleUrls: ['./cargar-trabajo.page.scss'],
})
export class CargarTrabajoPage implements OnInit {
  linea:string ="";
  via: string = "";
  ramal: string = "";
  progresivaInicial:number = 0;
  progresivaFinal:number = 0;
  fecha:string;
  id:any;
  cargar:Trabajo[]=[];
  datosCargados={}
  
  constructor(private activateRoutes:ActivatedRoute, private alertController: AlertController, private _cargarTrabajo: CargarTrabajoService, private navCtrl: NavController, private toastController: ToastController) {
    this.fecha = new Date().toISOString();
   }

  ngOnInit() {
    this.id = this.activateRoutes.snapshot.paramMap.get("id");
    this._cargarTrabajo.getCargarTrabajo()
    .then((cargar)=>{
      this.cargar=cargar
    })
    .catch((error)=>console.log(error));
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'bottom' // Position of the toast on the screen
    });
    toast.present();
  }
  guardar(){
    this.datosCargados = {
    linea:this.linea,
    ramal:this.ramal,
    via:this.via,
    progresivaInicial:this.progresivaInicial,
    progresivaFinal:this.progresivaFinal,
    idBateadora:this.id,
    fecha:this.fecha
    };
    console.log('la carga fue', this.datosCargados);
    this._cargarTrabajo.setCargarTrabajo( this.datosCargados).then(()=>{
      this.presentToast("Se ha modificado el equipo");

    })
    .catch((error) =>{
      alert ( error );
      console.log(error)
    });
    let cadenaConcatenada: string = `/trabajo/${this.id}`;
    this.navCtrl.navigateForward(cadenaConcatenada).then(() => {
      // Recargar la página
      window.location.reload();
    });    
  }
  atras(){
    this.navCtrl.back();
  }
  async mostrarPopup(){
    const alert = await this.alertController.create({
      header:'Ingresar una linea nueva',
      inputs:[{
        name:"linea",
        type:"text",
        placeholder:"Nueva Linea",
      }],
      buttons:[
        {
        text:'Cancelar',
        role:'cancel',
        handler:()=>{console.log('Accion cancelada');}
        },
        {
          text:'Aceptar',
          handler:(data)=>{console.log('valor ingresado ',data.linea);
          console.log(data.linea);
          this.cargar.push(data);
          this.linea= data.linea;
          }
        } 
      ]
    });
    await alert.present();
  }
}
