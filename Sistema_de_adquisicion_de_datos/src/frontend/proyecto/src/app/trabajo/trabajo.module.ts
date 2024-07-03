import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajoPageRoutingModule } from './trabajo-routing.module';

import { TrabajoPage } from './trabajo.page';

import { HeaderModule } from '../header/header.module'; // Importa HeaderModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajoPageRoutingModule,
    HeaderModule // Asegúrate de incluir HeaderModule aquí
  ],
  declarations: [TrabajoPage]
})
export class TrabajoPageModule {}
