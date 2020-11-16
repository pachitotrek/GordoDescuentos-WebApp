import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentesModule } from '../components/componentes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  entryComponents:[
    PopmenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
