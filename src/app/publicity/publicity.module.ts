import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicityPage } from './publicity.page';
import { ComponentesModule } from '../components/componentes.module';
import { PipesModule } from '../pipes/pipes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';

const routes: Routes = [
  {
    path: '',
    component: PublicityPage
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
    ReactiveFormsModule,
    ComponentesModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PublicityPage]
})
export class PublicityPageModule {}
