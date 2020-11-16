import { Injectable, EventEmitter } from '@angular/core';
import {Global} from './global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  notificacion = new EventEmitter<any>();

  constructor() { }


  subirArchivo(archivo:File,tipo:string,id:string){

    return new Promise((resolve,reject)=>{
      const formData:FormData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('archivo',archivo);
      var data = { 'content': formData };     
      xhr.onreadystatechange= function(){  
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {         
                         
            resolve( JSON.parse( xhr.response ) );   

          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }
        }
      };
      let url = Global.url+ 'upload/' + tipo + '/' + id;
      xhr.open('POST',url,true);
      xhr.send(formData);
    });
  }
  subirArchivos(archivos:Array<File>,tipo:string,id:string){

    console.log(archivos);

    return new Promise((resolve,reject)=>{
      const formData:FormData = new FormData();
      let xhr = new XMLHttpRequest();

      for (let i = 0; i < archivos.length; i++) {
        formData.append('archivo',archivos[i]);        
      }

      
      var data = { 'content': formData };     
      xhr.onreadystatechange= function(){  
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {         
                         
            resolve( JSON.parse( xhr.response ) );   

          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }
        }
      };
      let url = Global.url+ 'uploads/' + tipo + '/' + id;
      xhr.open('PUT',url,true);
      xhr.send(formData);
    });
  }







}
