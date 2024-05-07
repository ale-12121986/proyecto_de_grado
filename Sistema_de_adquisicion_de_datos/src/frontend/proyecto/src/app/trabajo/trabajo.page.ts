import { Component, OnInit } from '@angular/core';
import { TrabajoService } from '../services/trabajo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabajo } from '../interfaces/trabajo';
import { CargarTrabajoPage } from '../cargar-trabajo/cargar-trabajo.page';
import { state } from '@angular/animations';
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
  constructor(private _trabajoService: TrabajoService, private activateRoutes: ActivatedRoute,private router:Router) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = this.activateRoutes.snapshot.paramMap.get("id");
    console.log('ID del trabajo a mostrar:' + this.id);
    this._trabajoService.getDatosTrabajo(this.id)
    .then((listaDeTrabajo)=>{
      this.datosTrabajo = listaDeTrabajo;
      console.log(listaDeTrabajo);
    })
    .catch((error)=>{
      console.log(error)
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

}
