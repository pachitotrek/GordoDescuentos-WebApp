import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ComponentesModule } from '../components/componentes.module';
import { PopmenuComponent } from '../components/popmenu/popmenu.component';

@NgModule({
  entryComponents:[
    PopmenuComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
