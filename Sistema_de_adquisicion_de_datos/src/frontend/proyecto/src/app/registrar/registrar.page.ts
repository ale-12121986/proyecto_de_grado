import { Component, OnInit } from '@angular/core';
import { RegistrarService } from '../services/registrar.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { Bateadora } from '../interfaces/bateadora';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Login } from '../interfaces/login';
import { UserPopoverComponent } from '../user-popover/user-popover.component';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  id:any;
  equipos:any;
  prueba:any = "hola";
  bateadora: Bateadora ={idBateadora : 0, numeroBateadora:"", jefeEquipo: "", supervisor:""};
  usuario:any;
  nombre: string = 'Nombre del Usuario'; // Ejemplo de inicialización de nombre
  apellido: string = 'Apellido del Usuario'; // Ejemplo de inicialización de apellido
  constructor(private _registrarServices: RegistrarService, private alertController: AlertController,
    private toastController: ToastController, private activateRoutes:ActivatedRoute, private popoverController: PopoverController,) { 
    this.id = 0;
  }

  ngOnInit() {
    this.usuario = this.activateRoutes.snapshot.paramMap.get('legajo');
    if (this.usuario) {
      try {
        const usuarioObj = JSON.parse(this.usuario)[0];
        this.nombre = usuarioObj.nombre;
        this.apellido = usuarioObj.apellido;
        this.prueba =this.usuario;
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
      }
    } else {
      console.error("No se encontró 'legajo' en el paramMap.");
    }
    this._registrarServices.getEquiposRegistrados()
    .then((registro)=>{
      this.equipos = registro;
      this.id = registro.idbateadora;
    })
    .catch((error)=>console.log(error));
   
  }
  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: UserPopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();
  // }
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
