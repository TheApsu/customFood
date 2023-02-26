import { Injectable } from '@angular/core';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { NavController, Platform } from '@ionic/angular';
import { NewUser, User } from '../../../interface/interfaces';
import { initializeApp } from 'firebase/app';
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/general/services/storage.service';
import { UiService } from 'src/app/general/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private googleProvider = new GoogleAuthProvider();
  private auth = getAuth(initializeApp(environment.firebaseConfig));
  private _user: NewUser = undefined;

  get user(){
    return this._user;
  }

  set user(value){
    this._user = value;
  }

  constructor(
    private platform: Platform,
    private googlePlus: GooglePlus,
    private navCtrl: NavController,
    private storageSv: StorageService,
    private uiSv: UiService
  ) {
    const user = this.storageSv.getLocalStorage('user');
    this._user = user;
  }

  async signInWithGoogle(){
    if(this.platform.is('capacitor')){
      return await this.loginGoogleNative();
    }else{
      return await this.loginGoogleWeb();
    }
  }

  async loginGoogleNative(){
    try{
      const success: User = await this.googlePlus.login({
        'webClientId': '693756409209-7dp5jafa4srha6g6tkknq9uj7pi99qn5.apps.googleusercontent.com',
        'offline': true
      });
      const currentUser = await this.auth.currentUser.getIdToken(true);
      success.idToken = currentUser;
      return await this.login(success);
    }catch(err){
      console.error(err);
    }
  }

  async loginGoogleWeb(){
    try{
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const user = await this.login(result.user);
      // this.auth.currentUser.refreshToken;
      const currentUser = await this.auth.currentUser.getIdToken(true);
      console.log(currentUser);
      user.tokenId = currentUser
      return user;
    }catch(err){
      console.error(err);
    }
  }

  async login(user){
    const data: NewUser = {
      email: user.email,
      displayName: user.displayName,
      uid: user.uid || user.userId,
      signature: 'RyR'
    }
    return data;
  }

  async register(newRegister: NewUser){
    try{
      this.storageSv.setLocalStorage(true, 'user', newRegister);
      if(newRegister.newUser){
        this.navCtrl.navigateForward('carrousel');
      }else{
        this.navCtrl.navigateForward('home');
      }
      this._user = newRegister;
    }catch(err){
      console.error(err);
    }
  }

  async logout(){
    try{
      await this.uiSv.showLoading();
      await this.auth.signOut();
      await this.uiSv.loading.dismiss();
      this.storageSv.setLocalStorage(false, 'location');
      this.storageSv.setLocalStorage(false, 'user');
      this.navCtrl.navigateRoot('login');
    }catch(err){
      console.error(err);
    }
  }

}
