import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginSocialComponent } from 'src/app/pages/login/login-components/login-social/login-social.component';
import { IonicModule } from '@ionic/angular';
import { TypeRegisterComponent } from './type-register/type-register.component';

const declarations = [
  LoginEmailComponent,
  LoginSocialComponent,
  TypeRegisterComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class LoginComponentsModule { }
