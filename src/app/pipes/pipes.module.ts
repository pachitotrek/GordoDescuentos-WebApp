import { NgModule } from '@angular/core';
import { ImagenPipe } from './images.pipe';
import { SafePipe } from './safe.pipe';




@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafePipe
  ],
  exports: [
    ImagenPipe,
    SafePipe
  ]
})
export class PipesModule { }