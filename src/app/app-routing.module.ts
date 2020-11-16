import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.module').then(m => m.PublicarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'cupon/:id',
    loadChildren: () => import('./item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'addcat',
    loadChildren: () => import('./addcat/addcat.module').then(m => m.AddcatPageModule)
  },
  {
    path: 'addlocation',
    loadChildren: () => import('./addloca/addloca.module').then(m => m.AddlocaPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
  },
  {
    path: 'lugares',
    loadChildren: () => import('./locations/locations.module').then(m => m.LocationsPageModule)
  },
  {
    path: 'publicidad',
    loadChildren: () => import('./publicity/publicity.module').then(m => m.PublicityPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash:true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
