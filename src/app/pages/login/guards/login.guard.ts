import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/general/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private storageSv: StorageService,
    private navCtrl: NavController
  ){

  }
  canActivate(){
    const existUser = !!this.storageSv.getLocalStorage('user');
    if(existUser){
      this.navCtrl.navigateForward('tabs/home');
      return false;
    }else{
      return true;
    }
  }
  
}
