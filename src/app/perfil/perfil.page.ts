import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/internal/operators/map';
import { AlertController, LoadingController } from '@ionic/angular';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild('fileinput',{static:false}) fileinput:ElementRef;
  usuario:any=[];
  form:FormGroup;
  form_pass:FormGroup;
  archivo: File;
  ImagenTemp: string;
  loaderToShow: Promise<void>;
  
  constructor(private local:LocalStorageService,private api:ApiService,private user:UserService,
    private alertController:AlertController,private upload:UploadService,private loadingController:LoadingController) {
    this.form= new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      username:new FormControl(null,Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email])
    } );

    this.form_pass= new FormGroup({
      pass_actual:new FormControl(null,Validators.required),
      pass: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      pass2: new FormControl(null,Validators.required),
      // condiciones: new FormControl(false,Validators.requiredTrue)
    }, { validators: this.sonIguales('pass', 'pass2') }
    )


   }

  ngOnInit() {
    this.setuser();
  }

  setuser(){
    this.local.cargarStorage('usuario').then((data:any)=>{
      this.usuario=data;
      this.form.patchValue({nombre:this.usuario.nombre});
      this.form.patchValue({apellido:this.usuario.apellido});
      this.form.patchValue({username:this.usuario.username});
      this.form.patchValue({email:this.usuario.email});
    });
  }
  Existeusuario(control: AbstractControl) {

    return this.user.checkEmail(control.value).pipe( map((resp: any) => {
      return resp.email ? null : { emailTaken: true };
    }));

  }
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }
  updateUsuario(){
    this.showLoader();
    this.user.update(this.form.value).subscribe((resp:any)=>{
        if(resp.ok){
          this.hideLoader();
          let a ="Exito";
          let b ="Haz Actualizado tu usuario por favor ingresa de nuevo"; 
          localStorage.clear();          
          setTimeout(() => {
            this.presentAlert(a,b);
          }, 1200);

        }
    });
  }


  updateImagen(){
    this.showLoader();
    let categoria='profile';
    let id = this.usuario._id;

    this.upload.subirArchivo(this.archivo,categoria,id).then((data:any)=>{
      this.hideLoader();     
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
