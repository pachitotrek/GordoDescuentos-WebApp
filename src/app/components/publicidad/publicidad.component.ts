import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss'],
})
export class PublicidadComponent implements OnInit {
  @Input('data')data:any=[];  
  imagen:string="";

  constructor(private api:ApiService) { }

  ngOnInit() {  
    this.setImagen(this.data.imagen);
  }

  setImagen(data){
    this.imagen=`${Global.url}img/publicidad/${data}`;
  }



}
