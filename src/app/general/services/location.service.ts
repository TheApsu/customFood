import { EventEmitter, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from 'src/app/interface/interfaces';
import { CarrouselPaisesComponent } from '../../pages/location/location-components/carrousel-paises/carrousel-paises.component';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _location: Location = undefined;
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

  async getRestaurants(cb){
    try{
      const cityData = this._location?.city;
      const res = await this.httpSv.get(`getBusiness/${cityData.id}/all/`);
      this.emitNewLocation.emit(res);
    }catch(err){
      console.error(err);
      if(!this._location){
        await this.setLocation(false, cb);
      }
    }
  }

  async setLocation(noChange?, getRes?){
    try{
      console.log(noChange);
      const { data } = await this.uiSv.showModal(
        CarrouselPaisesComponent, 
        { startSlide: 1,
          blockInitalSlide: true,
          noChange
        });
      if(!this._location && !data){
        const { role } = await this.uiSv.showAlert('Aceptar', '', '', 'Ubicación', 'Debes seleccionar una ubicación para comenzar a hacer tus pedidos.', '', false);
        if(role === 'confirm'){
          await this.setLocation();
        }
      }else if(getRes){
        await this.getRestaurants(true);
      }
      return data;
    }catch(err){
      console.error(err);
    }
  }

}
