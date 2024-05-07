import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  logOut(){
    localStorage.removeItem('token');
  }
  
  public get logIn():boolean{
    return (localStorage.getItem('token') !== null);
  }
}
