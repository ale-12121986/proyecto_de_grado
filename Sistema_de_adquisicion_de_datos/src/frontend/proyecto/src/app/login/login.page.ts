import { Component, OnInit } from '@angular/core';
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:Login = {nombre:"", apellido:"", legajo:0, clave:""};
  errorMessage:string="";
  constructor(private _registrarAuth: AuthService, private router:Router) { }
  datos:any;  
  ngOnInit() {
  }

  login(){
    if(this.usuario.legajo && this.usuario.clave){
      this._registrarAuth.login(this.usuario)
      .then((dato)=>{
        this.datos = dato;
        this.router.navigate(['/registrar/'+JSON.stringify(this.datos)]);
        
      })
      .catch((error)=>{
        console.log(error)
        this.errorMessage = 'Usuario o contraseña incorrecta';
      });
    } else {
      this.errorMessage = 'Legajo y clave son requeridos';
    }
  }
}
