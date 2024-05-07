import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private _http: HttpClient) { }
  
  getEquiposRegistrados(): Promise<any>{
    console.log("entro");
    return firstValueFrom(this._http.get('http://localhost:8000/registrar/'));

  }

  setCargarEquipo(datos:any):Promise<any>{
    console.log("cargo un nuevo equipo de via ");
    return firstValueFrom(this._http.post('http://localhost:8000/registrar/datos',datos));
  }
  setEliminiarEquipos(datos:any):Promise<any>{
    console.log("Se elimino Registro", datos);
    return firstValueFrom(this._http.post('http://localhost:8000/registrar/eliminar', datos));
  }
}