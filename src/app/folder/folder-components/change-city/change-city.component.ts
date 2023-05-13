import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../../../general/services/http.service';
import { LocationService } from '../../../general/services/location.service';
import { Direcciones } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.component.html',
  styleUrls: ['./change-city.component.scss'],
})
export class ChangeCityComponent implements OnInit {
  @Input() direction: Direcciones;
  @Output() emitContent = new EventEmitter();
  public cities = [];
  public loaded = false;
  private _selectedCity = undefined;
  public backCities = [];
  public showCities = false;
  public changeIcon = undefined

  set selectedCity(value){
    this._selectedCity = value;
  }

  get selectedCity(){
    return this._selectedCity;
  }

  constructor(
    private httpSv: HttpService,
    public locationSv: LocationService
  ) { }

  ngOnInit() {
    this.detectIcon();
    this.getCities();
  }

  // onSearchChange(ev){
  //   const search = this.httpSv.removeAccents(ev.detail.value.toLowerCase());
  //   this.cities = this.backCities.filter(x => {
  //     const city = this.httpSv.removeAccents(x.city.toLowerCase());
  //     if(city.includes(search)){
  //       return x;
  //     }
  //   })
  // }

  async getCities(sCountry?, sState?, idCity?){
    try{
      const country = sCountry || this.direction?.city?.iso2 || this.locationSv.location.country.name;
      const state = sState || this.direction?.city?.admin_name_ascii || this.locationSv.location.state.name;
      const cities = await this.httpSv.getStates(country, state, true);
      this.selectedCity = cities.find(x => x.id === idCity || this.direction.city.city_ascii);
      this.emitContent.emit(this.selectedCity);
      this.cities = cities || [];
      return true;
    }catch(err){
      console.error(err);
    }
  }

  detectIcon(){
    this.direction ? this.changeIcon = 'swap-horizontal' : this.changeIcon = 'add';
  }

  // setCity(selectedCity){
  //   this.cities = this.backCities;
  //   this.selectedCity = selectedCity;
  //   this.emitContent.emit(selectedCity);
  // }

  trackByItems(index, item){
    return item?.id || '';
  }

  async changeRegion(){
    const location = await this.locationSv.setLocation(true);
    await this.getCities(location.country.name, location.state.name, location.city.id);
    this.selectedCity = this.cities.find(city => city.id === location.city.id);
    if(this.direction) this.direction.city = this.selectedCity;
    else {
      this.direction = { city: this.selectedCity };
      this.detectIcon();
    };
    console.log(this.direction.city);
    // this.getCities();
  }

  changeCity(){
    this.showCities = !this.showCities;
  }

}
