import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/general/services/http.service';
import { UiService } from 'src/app/general/services/ui.service';
import { NewUser } from 'src/app/interface/interfaces';
import { LoginService } from './services/login.service';
import { TypeRegisterComponent } from './login-components/type-register/type-register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('socialComponent') socialComponent: ElementRef;
  @ViewChild('emailComponent') emailComponent: ElementRef;

  public type: string;

  constructor(
    private renderer: Renderer2,
    private loginSv: LoginService,
    private httpSv: HttpService,
    private uiSv: UiService
  ) {}

  ngOnInit() {

  }

  async loginWith(ev){
    try{
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
        console.log('user :>> ', user);
        const newRegister = await this.setTypeRegister(user);
        console.log('newRegister :>> ', newRegister);
        await this.uiSv.showLoading();
        await this.loginSv.register(newRegister);
        await this.uiSv.loading.dismiss();

      }
    }catch(err){
      console.error(err);
      await this.loginSv.logout();
    }
  }

  async setTypeRegister(user){
    let register: NewUser = await this.httpSv.login(user, 'buyer');
    console.log('register :>> ', register);
    if(register.newUser){
      const typeUser = await this.uiSv.showPopover(
        TypeRegisterComponent, 
        null, 
        '', 
        false
      );
      const newRegister: NewUser = await this.httpSv.login(user, typeUser);
      register = newRegister;
    }
    register.tokenId = user.tokenId;
    return register;
  }

}
