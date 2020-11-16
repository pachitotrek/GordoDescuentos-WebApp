import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.scss'],
})
export class CuponComponent implements OnInit {
  imagen:String="";
  url:string;

  @Input('cupon') cupon:any=[];

  constructor(private router:Router) {
    this.url=Global.url;
   }

  ngOnInit() {
    this.setImg(this.cupon.imagen);  
  }

  setImg(image){  
    this.imagen=`${this.url}/img/cupon/${image}`;
  }

  nav(item){
    this.router.navigate(['/cupon',item]);
  }

}
