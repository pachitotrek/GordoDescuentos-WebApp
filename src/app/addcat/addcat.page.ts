import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { UploadService } from '../services/upload.service';
import { ApiService } from '../services/api.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.page.html',
  styleUrls: ['./addcat.page.scss'],
})
export class AddcatPage implements OnInit {
  @ViewChild('fileinput',{static:false}) fileinput :ElementRef;
  form:FormGroup;
  archivo: File;
  ImagenTemp: string;
  Imagendata:string;
  categorias:any=[];
  update:boolean=false;
  loaderToShow: Promise<void>;
  constructor(private local:LocalStorageService,private up:UploadService,private api:ApiService,private alertController:AlertController,
    private upload:UploadService,private loadingController:LoadingController) {
    this.form= new FormGroup({
      _id:new FormControl(null),
      titulo:new FormControl(null,Validators.required),
      descripcion:new FormControl(null),
      imagen:new FormControl(null)
    })
   }

  ngOnInit() {
    this.get();
  }

  crear(){
    this.showLoader();
    this.api.crearCategoria(this.form.value).subscribe((resp:any)=>{
        if(resp.ok){
          let categoria="categoria";        
          let id=resp.categoriadb._id;
          if(this.archivo){
            this.upload.subirArchivo(this.archivo,categoria,id).then((data:any)=>{
              this.hideLoader();
              this.form.reset();
              this.fileinput.nativeElement.value="";
              this.ImagenTemp="";
              this.archivo=null;
              let a ="Exito";
              let b ="Haz Agregado una nueva categoria"; 
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
            let b ="Haz Agregado una nueva categoria"; 
            this.get();         
            setTimeout(() => {
              this.presentAlert(a,b);
            }, 1200);
          }
       


        }
    });

  }
  get(){
    this.api.GetCategoria().subscribe((resp:any)=>{
        if(resp.ok){
          this.categorias=resp.categoriasDB;  
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
    this.api.updateCategoria(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        let categoria="categoria";        
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
            let b ="Haz Editado una categoria";
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
          let b ="Haz Editado una categoria";
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
    this.api.deleteCategoria(id).subscribe((resp:any)=>{
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
