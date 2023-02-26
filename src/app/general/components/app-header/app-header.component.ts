import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/interface/interfaces';
import { LocationService } from '../../services/location.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  public location: Location = undefined;

  constructor(
    private storageSv: StorageService,
    private locationSv: LocationService
  ) {
    this.location = this.storageSv.getLocalStorage('location');
  }

  ngOnInit() {}

  async changeLocation(){
    const data: Location = await this.locationSv.setLocation();
    if(data?.country){
      this.location = data;
      this.locationSv.getRestaurants();
    }
  }
}
