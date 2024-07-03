import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../user-popover/user-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() nombre: string = ''; // Propiedad de entrada 'nombre'
  @Input() apellido: string = ''; // Propiedad de entrada 'apellido'

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserPopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }
}
