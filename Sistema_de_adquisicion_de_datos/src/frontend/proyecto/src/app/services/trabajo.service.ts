import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Trabajo } from '../interfaces/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  constructor(private _http: HttpClient) { }

  getDatosTrabajo(dato: any):Promise<any> {
    // console.log("dato que llego" + dato);
    return firstValueFrom(this._http.get('http://localhost:8000/trabajo/'+ dato));
  }
  setEliminarTrabajo(dato:any):Promise<any>{
    // console.log("dato que llego para eliminar: ", dato.idTrabajo);
    return firstValueFrom(this._http.post('http://localhost:8000/trabajo/eliminar', dato));
  }
  setBuscarTrabajo(dato: Trabajo):Promise<any> {
    // console.log("dato que llego para buscar: ", dato);
    return firstValueFrom(this._http.post('http://localhost:8000/trabajo/buscar', dato));
  }
  getEquiposTrabajo():Promise<any>{
    return firstValueFrom(this._http.get('http://localhost:8000/trabajo/equipos'));
  }
  setModificarTrabajo(dato:Trabajo):Promise<any>{
    console.log("entro a modificar",dato);
    return firstValueFrom(this._http.post('http://localhost:8000/trabajo/modificar', dato));
  }
}
