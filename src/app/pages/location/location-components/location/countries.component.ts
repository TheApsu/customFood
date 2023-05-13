import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpService } from '../../../../general/services/http.service';

@Component({
  selector: 'app-locations',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  @Output() emitLocation = new EventEmitter();
  @Input() isState: boolean;
  @Input() isCity: boolean;
  @Input() state: string;
  @Input() country: string;
  @Input() text: string;
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;
  @Input() set uri(value){
    if(value){
      this.countries = [];
      this.backupCountries = [];
      this._uriValue = value;
      this.getCountries();
    }
  };
  @Input() set search(value: string){
    this.noResults = false;
    if(value){
      this.countries = [];
      this.backupCountries.map((item) => {
        const fixedName = item?.fixedName?.toLowerCase();
        value = value.toLowerCase()
        if(fixedName.includes(value)){
          this.countries.push(item);
          return item;
        }
      });

      if(!this.countries.length){
        this.noResults = true;
      }
    }else{
      this._initial = 25;
      if(this.backupCountries) this.countries = this.backupCountries.slice(0, this._initial);
    }
    this.infiniteScroll && (this.disabled = false);
    if(this.countries.length < 25){
      this.disabled = true;
    }
  };
  
  public disabled = false;
  public countries = [];
  public backupCountries = [];
  public noResults = false;
  private _uriValue = undefined;
  private _initial = 25;

  constructor(
    private httpSv: HttpService
  ) { }

  async getCountries(){
    try{
      let locations: any[] = undefined;
      if(this.isState || this.isCity){
        const city = this.isCity ? this.state : '';
        const state = this.isCity ? this.country : this._uriValue;
        console.log(state, city);
        locations = await this.httpSv.getStates(state, city);
      }else{
        locations = await this.httpSv.getLocations(this._uriValue);
        console.log(locations);
      }
      this.backupCountries = locations;
      this.backupCountries && (this.countries = this.backupCountries.slice(0, this._initial))
      this.disabled = false
    }catch(err){
      console.error(err);
      this.getCountries();
    }
  }
  
  trackByItems(index, item){
    return item.name;
  }

  setLocation(country){
    console.log(country);
    const locationData = {
      id: country?.id,
      name: country?.country_short_name || country?.fixedName
    }
    this.emitLocation.emit(locationData);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      const backInitial = this._initial;
      this._initial += 10;
      this.countries.push(...this.backupCountries.slice(backInitial, this._initial));
      if (this.countries.length === this.backupCountries.length) {
        this.disabled = true;
      }
    }, 500);
  }
}
