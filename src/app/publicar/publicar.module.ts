import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicarPage } from './publicar.page';
import { ComponentesModule } from '../components/componentes.module';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PublicarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PipesModule,
    ComponentesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PublicarPage]
})
export class PublicarPageModule {}
