import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from 'src/app/general/services/location.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private locationObs = new Subscription();
  public categories = [
    {
      name: 'Comida Rapida'
    },
    {
      name: 'Restaurantes'
    },
    {
      name: 'Cenas'
    },
    {
      name: 'Pizzas'
    },
  ]
  public businesses = [];

  constructor(
    private locationSv: LocationService
  ) { }

  ngOnInit() {
    this.getRestaurants();
  }

  async getRestaurants(){
    const locationObs = this.locationSv.emitNewLocation.subscribe(res => {
      this.businesses = res;
      console.log('res :>> ', res);
    })
    await this.locationSv.getRestaurants(true);
    this.locationObs.add(locationObs);
  }

  ngOnDestroy(): void {
    this.locationObs.unsubscribe();
  }
}
