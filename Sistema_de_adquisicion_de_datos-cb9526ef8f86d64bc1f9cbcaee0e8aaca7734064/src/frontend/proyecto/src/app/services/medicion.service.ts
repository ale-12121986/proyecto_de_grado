import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http:HttpClient) { }

  getResivirMedicion(dato:any):Promise<any>{
    console.log("se van a enviar los datos de medicion en " + dato);
    return firstValueFrom(this._http.get('http://localhost:8000/medicion/'+ dato));
  }
  
}
