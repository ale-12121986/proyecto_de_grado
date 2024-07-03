import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registrar/:legajo',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'trabajo/:id/:param',
    loadChildren: () => import('./trabajo/trabajo.module').then( m => m.TrabajoPageModule)
  },
  {
    path: 'cargar-trabajo/:id',
    loadChildren: () => import('./cargar-trabajo/cargar-trabajo.module').then( m => m.CargarTrabajoPageModule)
  },
  {
    path: 'medicion/:id',
    loadChildren: () => import('./medicion/medicion.module').then( m => m.MedicionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
