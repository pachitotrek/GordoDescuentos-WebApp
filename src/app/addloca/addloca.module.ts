import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddlocaPage } from './addloca.page';
import { ComponentesModule } from '../components/componentes.module';
import { PipesModule } from '../pipes/pipes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';

const routes: Routes = [
  {
    path: '',
    component: AddlocaPage
  }
];

@NgModule({
  entryComponents:[
    PopmenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentesModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddlocaPage]
})
export class AddlocaPageModule {}
