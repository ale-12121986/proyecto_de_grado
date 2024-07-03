import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule  } from './header/header.module';  // Asegúrate de tener la ruta correcta

import { UserPopoverModule } from './user-popover/user-popover.module'; // Importa UserPopoverModule


import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent, 
    // UserPopoverComponent
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    HeaderModule,
    UserPopoverModule
      ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
 
})
export class AppModule {}
