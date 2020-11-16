import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemPage } from './item.page';
import { ComponentesModule } from '../components/componentes.module';
import { PipesModule } from '../pipes/pipes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';

const routes: Routes = [
  {
    path: '',
    component: ItemPage
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
    ComponentesModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ItemPage]
})
export class ItemPageModule {}
