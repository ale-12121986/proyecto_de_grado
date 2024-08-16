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
  nombre: string = 'Nombre del Usuario'; // Ejemplo de inicialización de nombre
  apellido: string = 'Apellido del Usuario'; // Ejemplo de inicialización de apellido
  trabajo:Trabajo={idTrabajo:0, linea:"", ramal:"", via:"", progresivaInicial:0, progresivaFinal:0, idBateadora:0,
     fecha:new Date()};
  prueba:any;
  constructor(
    private _trabajoService: TrabajoService,
    private activateRoutes: ActivatedRoute,
    private router:Router, 
    private alertController: AlertController,
    private navCtrl: NavController) { 
    this.id = 0;
    this.prueba="";
  }

  ngOnInit() {
    this.id = this.activateRoutes.snapshot.paramMap.get("id");
    this.prueba = this.activateRoutes.snapshot.paramMap.get("param");
    if (this.prueba) {
      // try {
      //   const usuarioObj = JSON.parse(this.prueba)[0];
      //   this.nombre = usuarioObj.nombre;
      //   this.apellido = usuarioObj.apellido;
      //   // this.nombre= this.prueba.nombre;
      //   // this.apellido= this.prueba.apellido;
      //   this.prueba ={nombre:this.nombre, apellido:this.apellido};
      //   console.log("datos q me llegaron de la clave trabajo " + this.prueba + this.nombre + " " + this.apellido);
      // } catch (error) {
      //   console.error("Error al parsear el JSON:", error);
      // }
    } else {
      console.error("No se encontró 'legajo' en el paramMap.");
    }
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
  async modificar(dato:any){
    console.log("entro", dato);
    const formattedFecha = new Date(dato.fecha).toISOString().split('T')[0];
    const alert = await this.alertController.create({
      header:'modificar trabajo',
      inputs:[
        { name:"linea", type:"text", placeholder:"Linea",value: dato.linea},
        { name:"via", type:"text", placeholder:"Via", value:dato.via},
        { name:"ramal", type:"text", placeholder:"Ramal",value:dato.ramal},
        { name:"progresivaInicial", type:"number",placeholder:"progresivaInicial",value:dato.progresivaInicial},
        { name:"progresivaFinal", type:"number", placeholder:"progresivaFianl",value:dato.progresivaFinal},
        { name:"fecha", type:"date", placeholder:"fecha",value: formattedFecha }
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
            data.idTrabajo = dato.idTrabajo;
            this._trabajoService.setModificarTrabajo(data)
            .then((listaTrabajo)=>{
              this.datosTrabajo = listaTrabajo; // Actualizar la lista de trabajos
              location.reload();
          })
          .catch((error)=>{console.log(error)});
          }
        } 
      ]
    });

    await alert.present();
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
        { name:"progresivaInical", type:"number",placeholder:"progresivaInical"},
        { name:"progresivaFinal", type:"number", placeholder:"rogresivaFina"},
        { name:"fecha", type:"date", placeholder:"fecha"}
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

          })
          .catch((error)=>{console.log(error)});
          }
        } 
      ]
    });
    await alert.present();
  }
}
