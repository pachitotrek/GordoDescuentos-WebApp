import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { CuponComponent } from './cupon/cupon.component';
import { PopmenuComponent } from './popmenu/popmenu.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';




@NgModule({
  declarations: [PublicidadComponent,MenuComponent,FooterComponent,CuponComponent,PopmenuComponent,CommentsComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports:[
    PublicidadComponent,MenuComponent,FooterComponent,CuponComponent,PopmenuComponent,CommentsComponent  ]

})
export class ComponentesModule { }
