import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/interface/interfaces';
import { LocationService } from '../../../../general/services/location.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {

  constructor(
    public locationSv: LocationService
  ) {
  }

  ngOnInit() {}

  async changeLocation(){
    const data: Location = await this.locationSv.setLocation();
    if(data?.country){
      this.locationSv.getRestaurants(true);
    }
  }
}
