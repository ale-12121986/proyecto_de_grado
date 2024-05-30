import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private readonly serverUrl: string = "http://192.168.2.4:3000"    ///http://192.168.241.8:3000
  constructor() {
    this.socket = io(this.serverUrl);
   }

   
    // Método para escuchar eventos del servidor
    listen(eventName: string): Observable<any> {
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data: any) => {
          subscriber.next(data);
        });
      });
    }

  //  // Utiliza esta función para desconectar del socket si es necesario
  // Método para emitir eventos al servidor
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // Método para cerrar la conexión con el servidor
  disconnect() {
    this.socket.disconnect();
  }
}

