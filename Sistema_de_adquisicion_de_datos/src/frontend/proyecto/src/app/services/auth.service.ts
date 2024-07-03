import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'authToken';
  constructor(private _http:HttpClient) { }

  login(datos:Login):Promise<any>{
    console.log(datos);
    return firstValueFrom(this._http.post('http://localhost:8000/login/datos', datos))
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, firstValueFrom } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { Login } from '../interfaces/login';
// import { environment } from '../environments/environment'; // Importa el entorno correspondiente

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private tokenKey: string = 'authToken';
//   private apiUrl: string = environment.apiUrl // Usa la URL del entorno correspondiente

//   constructor(private http: HttpClient) { }

//   login(datos: Login): Promise<any> {
//     console.log("llego el valor", datos);
//     return firstValueFrom(
//       this.http.post<any>(`${this.apiUrl}/datos`, datos)
//         .pipe(
//           tap(response => {
//             // Almacena el token en localStorage
//             if (response && response.token) {
//               this.setToken(response.token);
//             }
//           }),
//           catchError(error => {
//             throw new Error(error.message || 'Error de autenticación');
//           })
//         )
//     );
//   }

//   logout(): Promise<any> {
//     // Limpia el token del localStorage al hacer logout
//     localStorage.removeItem(this.tokenKey);
//     return firstValueFrom(this.http.post<any>(`${this.apiUrl}/logout`, {}));
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   private setToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
// }
