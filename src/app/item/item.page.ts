import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Global } from '../services/global';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  id: string;
  cupon:any=[];
  imagen:any="";

  constructor(private route:ActivatedRoute,private api:ApiService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getCupon(this.id);
  }

  getCupon(item){
    this.api.Getcupon(item).subscribe((resp:any)=>{
      this.cupon=resp.cupon[0];

      this.imagen=`${Global.url}img/cupon/${this.cupon.imagen}`;

      console.log(this.cupon);
    });
  }

}
