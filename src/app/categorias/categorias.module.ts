import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page';
import { ComponentesModule } from '../components/componentes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
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
    ReactiveFormsModule,
    ComponentesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
