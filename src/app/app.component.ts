import { Component } from '@angular/core';
import { LocationService } from './general/services/location.service';
import { LoginService } from './pages/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Cuenta', url: 'tabs/account', icon: 'person' },
    { title: 'Ordenes', url: 'tabs/orders', icon: 'fast-food' },
    { title: 'Salir', url: undefined, icon: 'exit' },
  ];
  public defaultImg = '/assets/testImg/defaultImage.png';
  constructor(
    public loginSv: LoginService,
    private locationSv: LocationService
  ) {
  }

  async verifyUrl(url){
    if(url === undefined){
      await this.loginSv.logout();
      this.locationSv.location = undefined;
    }
  }
}
