import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginSocialComponent } from 'src/app/pages/login/login-components/login-social/login-social.component';
import { IonicModule } from '@ionic/angular';

const declarations = [
  LoginEmailComponent,
  LoginSocialComponent
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
