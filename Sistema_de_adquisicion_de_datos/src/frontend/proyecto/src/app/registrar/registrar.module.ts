import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';

import { HeaderModule } from '../header/header.module'; // Importa HeaderModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPageRoutingModule,
    HeaderModule // Asegúrate de incluir HeaderModule aquí
  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}
