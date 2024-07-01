import { Injectable } from '@angular/core';
import { Medicion } from "../interfaces/medicion";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http:HttpClient) { }

  getResivirMedicion(dato:any):Promise<any>{
    return firstValueFrom(this._http.post('http://localhost:8000/medicion/buscar', dato));
  }
  getResivirDatoTiempoReal():Promise<any>{
    return firstValueFrom(this._http.get('http://localhost:8000/mqtt/'));
  }
}
