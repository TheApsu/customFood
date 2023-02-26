import { EventEmitter, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from 'src/app/interface/interfaces';
import { environment } from 'src/environments/environment';
import { CarrouselPaisesComponent } from '../components/carrousel-paises/carrousel-paises.component';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _location: Location = undefined;
  private _url = environment.url;
  public emitNewLocation = new EventEmitter();
  set location(value){
    this._location = value;
  }

  get location(){
    return this._location;
  }

  constructor(
    private navCtrl: NavController,
    private storageSv: StorageService,
    private httpSv: HttpService,
    private uiSv: UiService
  ) {
    this._location = this.storageSv.getLocalStorage('location');
  }

  saveLocation(isModal): void{
    if(!isModal){
      this.navCtrl.navigateForward('login');
    }
    // Guardar la localizacion en el storage;
    this.storageSv.setLocalStorage(true, 'location', this._location);
  }

  async getRestaurants(){
    try{
      const country = this._location?.country.name || 'VE';
      const state = this._location?.state.name || 'Tachira';
      const cityData = this._location?.city;
      // const city = cityData.name || 'San Cristobal';
      const uri = `${country}/${state}/${cityData.id}`;
      const res = await this.httpSv.post(`${this._url}/getBusiness/${uri}`, {
        signature: 'RyR'
      }, {});
      this.emitNewLocation.emit(res);
    }catch(err){
      if(!this._location){
        await this.setLocation();
      }
      console.error(err);
    }
  }

  async setLocation(){
    try{
      const { data } = await this.uiSv.showModal(CarrouselPaisesComponent, { startSlide: 1, blockInitalSlide: true });
      if(!this._location && !data){
        const {role} = await this.uiSv.showAlert('Aceptar', '', '', 'Ubicación', 'Debes seleccionar una ubicación para comenzar a hacer tus pedidos.', '', false);
        if(role === 'confirm'){
          await this.setLocation();
        }
      }
      return data;
    }catch(err){
      console.error(err);
    }
  }

}
