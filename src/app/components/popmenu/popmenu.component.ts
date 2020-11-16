import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss'],
})
export class PopmenuComponent implements OnInit {
  user:any=[];
  normal=[
    {id:1,titulo:'Publicar',link:'/publicar'},
    {id:2,titulo:'Mi perfil',link:'/perfil'},
    {id:3,titulo:'Mis publicaciones',link:'/publicaciones'},
    {id:6,titulo:'Cerrar Sesión',link:'/logout'}
  ];
  admin=[
    {id:1,titulo:'Publicar',link:'/publicar'},
    {id:2,titulo:'Mi perfil',link:'/perfil'},
    {id:3,titulo:'Mis publicaciones',link:'/publicaciones'},
    {id:4,titulo:'Añadir Categoria',link:'/addcat'},
    {id:5,titulo:'Añadir Ubicacion',link:'/addlocation'},
    {id:6,titulo:'Cerrar Sesión',link:'/logout'}
  ];
  menu:any=[];
  constructor(private local:LocalStorageService,private us:UserService,private router:Router) { }

  ngOnInit() {
    this.checkState();
  }

  checkState(){
    this.local.cargarStorage('usuario').then((data)=>{
      this.user=data;
      if(this.user.role==2){
        this.menu=this.normal;
      }
      if(this.user.role==1){
        this.menu=this.admin;
        console.log("aqui");
      }
    }).catch((error)=>{
    
    
    });
  }

  make(item){
    if(item.id==6){
      this.us.logout(); 
      window.location.reload();
    }else{
      this.router.navigate([item.link]);
    }
    console.log(item)
  }

}
