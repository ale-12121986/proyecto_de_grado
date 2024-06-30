import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Bateadora } from '../interfaces/bateadora';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private _http: HttpClient) { }

  getEquiposRegistrados(): Promise<any>{
    return firstValueFrom(this._http.get('http://localhost:8000/registrar/'));

  }

  setCargarEquipo(datos:any):Promise<any>{
    return firstValueFrom(this._http.post('http://localhost:8000/registrar/datos',datos));
  }
  setEliminiarEquipos(datos:any):Promise<any>{
    return firstValueFrom(this._http.post('http://localhost:8000/registrar/eliminar', datos));
  }
  setModificarEquipos(datos:Bateadora):Promise<any>{
    console.log("entro a modificar",datos);
    return firstValueFrom(this._http.post('http://localhost:8000/registrar/modificar', datos));
  }
}
