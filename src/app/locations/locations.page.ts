import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  locations: any=[];
  

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getLocations();
  }

  getLocations(){
    this.api.GetLocations().subscribe((resp:any)=>{
      this.locations=resp.locationdb;
    });
  }

}
