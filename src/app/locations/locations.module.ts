import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationsPage } from './locations.page';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentesModule } from '../components/componentes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsPage
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
    PipesModule,
    ComponentesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
