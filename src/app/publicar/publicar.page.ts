import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { ApiService } from '../services/api.service';
import { UploadService } from '../services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  @ViewChild('fileinput',{static:false})fileinput:ElementRef;
  cupon:FormGroup;
  logged:boolean=false;
  archivo: File;
  ImagenTemp: string;
  Imagendata:any="";
  usuario:any=[];
  categorias:any=[];
  locations:any=[];
  loaderToShow: Promise<void>;

  constructor(private alertController:AlertController,private local:LocalStorageService,
    private api:ApiService,private loadingController:LoadingController,private upload:UploadService,private router:Router) {
    this.cupon= new FormGroup({
      _id:new FormControl(null),
      titulo:new FormControl(null,Validators.required),
      descripcion:new FormControl(null,Validators.required),
      restaurante:new FormControl(null,Validators.required),
      direccion:new FormControl(null),
      oferta:new FormControl(null,Validators.required),
      categoria:new FormControl(null,Validators.required),
      location:new FormControl(null,Validators.required),
      usuario:new FormControl(null),
      fin:new FormControl(null,Validators.required),
      imagen:new FormControl(null)
    });
   }

  ngOnInit() {
    this.getusuario();
    this.getCategorias();
    this.getLocations();
  }

  crear(){
    this.showLoader();
    this.api.crearCupon(this.cupon.value).subscribe((resp:any)=>{
        if(resp.ok){
          let categoria="cupon";        
          let id=resp.cuponDB._id;
        
          if(this.archivo){
            this.upload.subirArchivo(this.archivo,categoria,id).then((data:any)=>{
              console.log(data);
              this.hideLoader();
              this.cupon.reset();
              this.fileinput.nativeElement.value="";
              this.ImagenTemp="";
              this.archivo=null;
              let a ="Exito";
              let b ="Haz Agregado una nueva categoria"; 
                      
              setTimeout(() => {
                this.presentAlert(a,b);
              }, 1200);
             
            }).catch((error:any)=>{
              this.hideLoader();
              let a="Error";
              let b ="No se pudo subir la imagen";
              setTimeout(() => {
                this.presentAlert(a,b);
              }, 300);
            })
          }else{
            this.hideLoader();
            this.cupon.reset();
            this.fileinput.nativeElement.value="";
            this.ImagenTemp="";
            this.archivo=null;
            let a ="Exito";
            let b ="Haz Agregado una nueva categoria"; 
                    
            setTimeout(() => {
              this.presentAlert(a,b);
            }, 1200);
          }     
        }
    });
  }

  seleccionImagen(archivo:File){
    if(!archivo){
      this.archivo=null;
      return;
    } 
    if(archivo.type.indexOf('image')<0){
      let a=`Error`;
      let b = `Solo se aceptan imagenes`;
      this.presentAlert(a,b);
      this.fileinput.nativeElement.value="";
      return;
    }   
    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);
    reader.onloadend=()=>this.ImagenTemp=reader.result.toString();
    this.archivo=archivo;      
  }

  async presentAlert( a,b ) {
    const alert = await this.alertController.create({
      header: `${a}`,  
      message: `${b}`,
      buttons: ['OK'],
      mode:'ios'
    });
    await alert.present();
  }

  getusuario(){
    this.local.cargarStorage('usuario').then((data:any)=>{
      this.usuario=data;
      this.logged=true;
      this.cupon.patchValue({usuario:this.usuario._id});
    }).catch((error:any)=>{
      this.usuario=null;
      this.logged=false;
    });
  }

  getCategorias(){
    this.api.GetCategoria().subscribe((resp:any)=>{
      this.categorias=resp.categoriasDB;
    });
  }
  getLocations(){
    this.api.GetLocations().subscribe((resp:any)=>{
      this.locations=resp.locationdb;
    });
  }
  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: `Subiendo Imagen`,
      mode:'ios'   
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }  
  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }

  nav(){
    this.router.navigate(['/login']);
  }



}
