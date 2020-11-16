import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuario:any=[];
  publicidad:any=[];
  data:any=[];
  login:boolean=false;
  categorias: any=[];
  locations: any=[];
  search:any=[
    {
      a:"",
      b:""
    }
  ];
  cupones:any=[];




  constructor(private userService:UserService,private local:LocalStorageService,private api:ApiService) {
  }


  ngOnInit(){
    this.getCategorias();
    this.getLocations();
    this.getCupones();  
    this.getPublicidad();

  }
  

  ionViewWillEnter() {
    this.getCategorias();
    this.getLocations();
    this.getCupones();
    this.getPublicidad();  
  }

  setcat(event){
    this.search.a = event.detail.value;
    this.getCupones(this.search.a,this.search.b);
  }
  setloca(event){
    this.search.b = event.detail.value;
    this.getCupones(this.search.a,this.search.b);
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
  getCupones(a?,b?){
    this.api.GetCupones(a,b).subscribe((resp:any)=>{
      if(resp.ok){
      this.cupones=resp.cupones;
      }
    });
  }
  getPublicidad(){
    this.api.Getpublicidad().subscribe((resp:any)=>{
          if(resp.ok){
            this.publicidad=resp.publicidad;
          }
    });
  }

 
}
