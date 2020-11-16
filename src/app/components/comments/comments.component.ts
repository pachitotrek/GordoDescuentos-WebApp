import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  id:string="";
  form:FormGroup;
  usuario:any=[];
  comentarios:any=[];
  logged:boolean=false;
  imguser:string="";

  constructor(private api:ApiService,private local:LocalStorageService,private route:ActivatedRoute,public alertController: AlertController,
    private router:Router) {
    this.form=new FormGroup({
      usuario:new FormControl(null),
      mensaje:new FormControl(null,Validators.required),
      cupon: new FormControl(null)
    });
   }

  ngOnInit() {  
    this.id = this.route.snapshot.paramMap.get("id");
    this.getcomentarios(this.id);
    this.form.patchValue({cupon:this.id});
    this.setuser();
  }
  getcomentarios(id){
    this.api.Getcomentarios(id).subscribe((resp:any)=>{
      this.comentarios=resp.comentarios[0].mensajes;
    });
  }
  send(){
    this.api.setComentario(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.presentAlert();
        this.form.patchValue({mensaje:""});
        this.getcomentarios(this.id);
      }
    });
  }
  setuser(){
    this.local.cargarStorage('usuario').then((data:any)=>{
        this.usuario=data;
        this.form.patchValue({usuario:this.usuario._id});
        this.logged=true;
    }).catch((error:any)=>{
      this.logged=false;
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exito',
      subHeader: 'Comentario enviado',
      message: 'Haz agregado un nuevo comentario a esta promocion.',
      buttons: ['OK'],
      mode:'ios'
    });
    await alert.present();
  }
  delete(id){
    let data={
      comentario:id,
      cupon:this.id
    }
    this.api.deletecomentario(data).subscribe((resp:any)=>{
        if(resp.ok){
         this.getcomentarios(this.id);
        }
    });
  }
  nav(){
    this.router.navigate(['/login']);
  }
  





}
