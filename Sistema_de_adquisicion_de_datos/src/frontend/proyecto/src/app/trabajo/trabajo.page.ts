import { Component, OnInit } from '@angular/core';
import { Trabajo } from '../interfaces/trabajo';
import { TrabajoService } from '../services/trabajo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CargarTrabajoPage } from '../cargar-trabajo/cargar-trabajo.page';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.page.html',
  styleUrls: ['./trabajo.page.scss'],
})
export class TrabajoPage implements OnInit {
  id: any;
  datosTrabajo: Trabajo[]=[];
  trabajo:Trabajo={
    idTrabajo:0,
    linea:"",
    ramal:"",
    via:"",
    progresivaInicial:0,
    progresivaFinal:0,
    idBateadora:0,
    fecha:new Date()
  };

  constructor(
    private _trabajoService: TrabajoService,
    private activateRoutes: ActivatedRoute,
    private router:Router, 
    private alertController: AlertController,
    private navCtrl: NavController) { 
    this.id = 0;
  }

  ngOnInit() {
    this.id = this.activateRoutes.snapshot.paramMap.get("id");

    if(this.id == null){
    
    }
    console.log('ID del trabajo a mostrar:' + this.id);
    this._trabajoService.getDatosTrabajo(this.id)
    .then((listaDeTrabajo)=>{
      this.datosTrabajo = listaDeTrabajo;
      console.log(listaDeTrabajo);
    })
    .catch((error)=>{
      console.log("prueba");
    })
  }
  guardar(){
    this.router.navigate([CargarTrabajoPage]);
  }
  modificar(dato:any){
    console.log('se modifico ',dato);
    this.router.navigate([CargarTrabajoPage],{state:{dato}});
  }
  eliminar(dato:any){
    console.log('se elimino ',dato);
    this.trabajo.idTrabajo = dato;
    console.log('se eliminino ',this.trabajo.idTrabajo);
    this._trabajoService.setEliminarTrabajo(this.trabajo)
    .then((valorSensor)=>{
      //console.log(valorSensor)
    })
    .catch((error)=>{
      console.log(error)
    })
    window.location.reload();

  }

  atras(){
    this.navCtrl.back();
  }
  async buscar(){
    const alert = await this.alertController.create({
      header:'buscar un trabajo',
      inputs:[
        { name:"linea", type:"text", placeholder:"Linea"},
        { name:"via", type:"text", placeholder:"Via"},
        { name:"ramal", type:"text", placeholder:"Ramal"},
        { name:"progresivaInical", type:"number",placeholder:"Ramal"},
        { name:"progresivaFinal", type:"number", placeholder:"Ramal"},
        { name:"fecha", type:"date", placeholder:"Ramal"}
      ],
      buttons:[
        {
        text:'Cancelar',
        role:'cancel',
        handler:()=>{console.log('Accion cancelada');}
        },
        {
          text:'Aceptar',
          handler:(data:Trabajo)=>{
            this._trabajoService.setBuscarTrabajo(data)
            .then((listaTrabajo)=>{
              this.datosTrabajo = listaTrabajo; // Actualizar la lista de trabajos
          })
          .catch((error)=>{console.log(error)});
          }
        } 
      ]
    });
    await alert.present();
  }
}
