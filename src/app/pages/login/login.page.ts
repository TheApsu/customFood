import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/general/services/http.service';
import { LocationService } from 'src/app/general/services/location.service';
import { UiService } from 'src/app/general/services/ui.service';
import { NewUser } from 'src/app/interface/interfaces';
import { environment } from 'src/environments/environment';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('socialComponent') socialComponent: ElementRef;
  @ViewChild('emailComponent') emailComponent: ElementRef;

  public type: string;
  private _url = environment.url;

  constructor(
    private renderer: Renderer2,
    private loginSv: LoginService,
    private httpSv: HttpService,
    private locationSv: LocationService
  ) {}

  ngOnInit() {

  }

  async loginWith(ev){
    let component = undefined;
    if(ev === false){
      component = this.emailComponent.nativeElement;
    }else if(ev === 'email'){
      component = this.socialComponent.nativeElement;
      this.renderer.addClass(component, 'disAppear');
      setTimeout(() => {
        this.type = ev;
      }, 450)
    }else if(ev === 'google'){
      const user = await this.loginSv.signInWithGoogle();
      // const { data, role } = await this.uiSv.showAlert(
      //   'Tienda', 
      //   'Usuario', 
      //   'Bienvenido a CustomFood', 
      //   'Selecciona un tipo de registro',
      //   undefined,
      //   'registerType',
      //   false
      // );
      const newRegister: NewUser = await this.httpSv.post(`${this._url}/login`, user);
      newRegister.tokenId = user.tokenId;
      await this.loginSv.register(newRegister);
      await this.locationSv.setLocation();
      await this.locationSv.getRestaurants();
      // if(role === 'cancel'){
      // }else{

      // }
    }
  }
}
