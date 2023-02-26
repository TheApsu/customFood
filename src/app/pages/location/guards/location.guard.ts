import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CanActivate } from '@angular/router';
import { StorageService } from 'src/app/general/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocationGuard implements CanActivate {
  constructor(
    private storageSv: StorageService,
    private navCtrl: NavController
  ){

  }
  canActivate(){
    const noUser = !!this.storageSv.getLocalStorage('user');
    if(noUser){
      this.navCtrl.navigateForward('tabs/home');
    }
    return !noUser;
  }
  
}
