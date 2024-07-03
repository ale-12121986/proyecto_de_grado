import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent  implements OnInit {

  constructor(private popoverController: PopoverController,private router:Router) { }

  ngOnInit() {}

  logout() {
    // Implementa la lógica para cerrar sesión
    console.log("entro");
    this.router.navigate(['/login'])
    this.popoverController.dismiss();
  }

  registerNewUser() {
    // Implementa la lógica para registrar a una nueva persona
    this.popoverController.dismiss();
  }

}

// import { Component, OnInit } from '@angular/core';
// import { PopoverController } from '@ionic/angular';
// import { AuthService } from '../services/auth.service';


// @Component({
//   selector: 'app-user-popover',
//   templateUrl: './user-popover.component.html',
//   styleUrls: ['./user-popover.component.scss'],
// })
// export class UserPopoverComponent implements OnInit {

//   constructor(private popoverController: PopoverController, private authService: AuthService) { }

//   ngOnInit() {}

//   logout() {
//     this.authService.logout().then(() => {
//       this.popoverController.dismiss();
//     });
//   }

//   registerNewUser() {
//     // Implementa la lógica para registrar a una nueva persona
//     this.popoverController.dismiss();
//   }
// }