import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', //folder/Inbox
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  // {
  //   path: 'medicion/:id',
  //   loadChildren: () => import('./medicion/medicion.module').then( m => m.MedicionPageModule)
  // },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  // {
  //   path: 'trabajo',
  //   loadChildren: () => import('./trabajo/trabajo.module').then( m => m.TrabajoPageModule)
  // },
  {
    path: 'trabajo/:id',
    loadChildren: () => import('./trabajo/trabajo.module').then( m => m.TrabajoPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    path: 'medicion',
    loadChildren: () => import('./medicion/medicion.module').then( m => m.MedicionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
