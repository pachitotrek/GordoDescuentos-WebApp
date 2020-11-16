import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddcatPage } from './addcat.page';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';
import { ComponentesModule } from '../components/componentes.module';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: AddcatPage
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
  declarations: [AddcatPage]
})
export class AddcatPageModule {}
