import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  constructor(private _http: HttpClient) { }

  getDatosTrabajo(dato: any):Promise<any> {
    console.log("dato que llego" + dato);
    return firstValueFrom(this._http.get('http://localhost:8000/trabajo/'+ dato));
  }
  setEliminarTrabajo(dato:any):Promise<any>{
    console.log("dato que llego para eliminar: ", dato.idTrabajo);
    return firstValueFrom(this._http.post('http://localhost:8000/trabajo/eliminar', dato));
  }
}
