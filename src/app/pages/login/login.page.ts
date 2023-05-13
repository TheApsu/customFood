import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/general/services/http.service';
import { UiService } from 'src/app/general/services/ui.service';
import { NewUser } from 'src/app/interface/interfaces';
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
    
        await this.uiSv.showLoading();
        const newRegister: NewUser = await this.httpSv.login(user);
        newRegister.tokenId = user.tokenId;
        await this.loginSv.register(newRegister);
        await this.uiSv.loading.dismiss();

      }
    }catch(err){
      console.error(err);
      await this.loginSv.logout();
    }
  }
}
