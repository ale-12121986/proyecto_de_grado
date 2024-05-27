import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // private socket: Socket;
  // private readonly serverUrl: string = "http://192.168.0.9:3000"    ///http://192.168.241.8:3000
  constructor() {
    // this.socket = io(this.serverUrl);
   }

   
  // public getMessages(): Observable<string> {
  //   return new Observable<string>(observer => {
  //     this.socket.on('mensajeDesdeMqtt', (mensaje: string) => {
  //       observer.next(mensaje);
  //     });
  //   });
  // }

  //  // Utiliza esta función para desconectar del socket si es necesario
  //  public disconnect() {
  //   if (this.socket) {
  //     this.socket.disconnect();
  //   }
  // }
}
