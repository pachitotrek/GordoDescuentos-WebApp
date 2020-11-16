import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias:any=[];

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(){
    this.api.GetCategoria().subscribe((resp:any)=>{
      this.categorias=resp.categoriasDB;
      console.log(this.categorias);
    });
  }

}
