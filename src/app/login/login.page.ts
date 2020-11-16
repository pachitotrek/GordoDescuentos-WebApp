import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Global } from 'src/app/services/global';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form:FormGroup;
  usuario:any=[];

  auth2: any = [];

  constructor(private userService:UserService,public loadingController: LoadingController, 
    private local:LocalStorageService,private router:Router) {
    this.form= new FormGroup({
      email: new FormControl(null,Validators.required),
      pass: new FormControl(null,Validators.required)
    });
   }

  ngOnInit() {
    this.googleInit(); 
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: Global.ClientId,
        cookiepolicy: Global.cookiepolicy,
        scope: Global.scope
      });      
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }
  attachSignin(element) {  
    this.auth2.attachClickHandler(element, {}, (googleUser) => {          
      let token = googleUser.getAuthResponse().id_token;   
      this.userService.googleAuth(token).subscribe((resp: any) => {       
        if (resp) {  
          this.router.navigate(['/home']);     
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
                          
        }
      });
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Ingresando por favor espere !!'      
    });
    await loading.present();
  }

  cargando(){
    this.presentLoading();
  }

  login(){
    this.cargando();
    this.userService.login(this.form.value).subscribe((resp:any)=>{
      if(resp){
        this.loadingController.dismiss();   
        this.router.navigate(['/home']);
      }
    });
  }
  
  getUser(){
    this.local.cargarStorage('usuario').then((data:any)=>{

      this.usuario= data;
      this.loadingController.dismiss();

    }).catch((err:any)=>{

      this.usuario=[];
      this.loadingController.dismiss();

    })
  }

  redirect(){
    this.router.navigate(['/register']);
  }



}
