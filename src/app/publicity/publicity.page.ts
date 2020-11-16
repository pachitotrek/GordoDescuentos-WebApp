import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.page.html',
  styleUrls: ['./publicity.page.scss'],
})
export class PublicityPage implements OnInit {
  @ViewChild('fileinput',{static:false}) fileinput:ElementRef;
  data:any=[];
  form:FormGroup;
  archivo: File;
  ImagenTemp: string;
  loaderToShow: Promise<void>;
  Imagendata: any;
  update: boolean;

  constructor(private api:ApiService,private loadingController:LoadingController,private alertController:AlertController, private upload:UploadService) {
    this.form= new FormGroup({
      _id: new FormControl(null),
      titulo: new FormControl(null,Validators.required),
      imagen:new FormControl(null)
    });
   }

  ngOnInit() {
    this.get();
  }

  
  get(){
    this.api.Getpublicidad().subscribe((resp:any)=>{
          if(resp.ok){
            this.data=resp.publicidad;        
          }
    });
  }
  
  crear(){
    this.showLoader();
    this.api.crearPublcidad(this.form.value).subscribe((resp:any)=>{
        if(resp.ok){
          let categoria="publicidad";        
          let id=resp.publicidad._id;
          if(this.archivo){
            this.upload.subirArchivo(this.archivo,categoria,id).then((data:any)=>{
              this.hideLoader();
              this.form.reset();
              this.fileinput.nativeElement.value="";
              this.ImagenTemp="";
              this.archivo=null;
              let a ="Exito";
              let b ="Haz Agregado una nueva publicidad"; 
              this.get();         
              setTimeout(() => {
                this.presentAlert(a,b);
              }, 1200);
             
            }).catch((error:any)=>{
              let a="Error";
              let b ="No se pudo subir la imagen";
              setTimeout(() => {
                this.presentAlert(a,b);
              }, 300);
            })
          }else{
            this.hideLoader();
            this.form.reset();
            this.fileinput.nativeElement.value="";
            this.ImagenTemp="";
            this.archivo=null;
            let a ="Exito";
            let b ="Haz Agregado una nueva publicidad"; 
            this.get();         
            setTimeout(() => {
              this.presentAlert(a,b);
            }, 1200);
          }     
        }
    });
  }

  setMenu(data){
    this.form.setValue(data);
    this.Imagendata=data.imagen;
    this.update=true;
  }

  updateCat(){
    this.showLoader();
    this.api.updatePublicidad(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        let categoria="publicidad";        
        let id=this.form.value._id;
        if(this.ImagenTemp){
          this.upload.subirArchivo(this.archivo,categoria,id).then((data:any)=>{
            this.hideLoader();
            this.form.reset();
            this.fileinput.nativeElement.value="";
            this.ImagenTemp="";
            this.archivo=null;
            this.Imagendata=null;
            let a ="Exito";
            let b ="Haz Editado una publicidad";
            this.get();          
            setTimeout(() => {
              this.presentAlert(a,b);
            }, 1200);

          }).catch((error:any)=>{
            let a="Error";
            let b ="No se pudo subir la imagen";
            setTimeout(() => {
              this.presentAlert(a,b);
            }, 300);
          })
        }else{
          this.hideLoader();
          let a ="Exito";
          let b ="Haz Editado una publicidad";
          this.Imagendata=null; 
          this.form.reset();
          this.fileinput.nativeElement.value="";
          this.get();         
          setTimeout(() => {
            this.presentAlert(a,b);
          }, 1200);
        }       
      }
    });
  }
  eliminar(id){
    this.api.deletePublicidad(id).subscribe((resp:any)=>{
      if(resp){    
        this.get();
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



}
