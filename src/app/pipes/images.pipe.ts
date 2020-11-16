import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../services/global';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo:string ='usuario'): any {

    let url= Global.url+'img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'categoria':
        url += '/categoria/' + img;
      break;

      case 'lugar':
        url += '/lugar/' + img;
      break;

      case 'cupon':
        url += '/cupon/' + img;
      break;

      case 'profile':
        url += '/profile/' + img;
      break;

      case 'publicidad':
        url += '/publicidad/' + img;
      break;

      case 'tienda':
         url += '/tienda/' + img;
      break;
      
      case 'videos':
          url = Global.url + 'stream/' + img;
        //  url += '/videos/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }



    return url;
  }

}
