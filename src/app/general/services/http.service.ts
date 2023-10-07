import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { environment } from 'src/environments/environment';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _countriesApiKey = environment.countriesApiKey;
  private _accountApiKey = environment.accountKey;
  private _uri = undefined;
  private _url = environment.url;
  private accountToken = environment.accountToken;

  get uri(){
    return this._uri;
  }
  
  set uri(value){
    this._uri = value;
  }
  
  constructor(
    private http: HttpClient,
    private loginSv: LoginService,
    private uiSv: UiService
  ) { }

  post(url, body = {}, opts?, uri?){
    return new Promise<any>((resolve, reject) => {
      if(opts) {
        opts.Authorization = `bearer ${this.loginSv.user?.tokenId || this.accountToken}`;
      }else{
        opts = {};
      }
      const data = {
        signature: 'RyR',
        version: environment.version,
        typeUser: 'buyer',
        uid: this.loginSv?.user?.uid || '',
        ...body
      }
      console.log('url :>> ', url);
      opts.version = `${environment.version}`;
      if(!url) url = environment.url;
      if(uri) url += uri;
      const post = this.http.post(url, data, { headers: opts }).subscribe((res) => {
        post.unsubscribe();
        resolve(res)
      }, async err => {
        await this.uiSv.showToast('Ha ocurrido un error.');
        reject(err)
      })
    })
  } 

  async login(user, typeUser){
    return await this.post(`${this._url}/login`,
      {
        ...user, 
        typeUser, 
        version: environment.version 
      },
      { Authorization: `bearer ${user.tokenId}` },
    )
  }

  get(uri, opts?){
    return new Promise<any>((resolve, reject) => {
      if(opts) {
        opts.Authorization = `bearer ${this.loginSv.user?.tokenId || this.accountToken}`;
      } else {
        opts = {};
      }
      opts.version = `${environment.version}`;
      const get = this.http.get(`${environment.url}/${uri}`, { headers: opts }).subscribe((res) => {
        get.unsubscribe();
        resolve(res)
      }, async err => {
        await this.uiSv.showToast('Ha ocurrido un error.');
        reject(err)
      })
    })
  }

  getExternal(url, opts?){
    return new Promise<any>((resolve, reject) => {
      if(opts) {
        opts.Authorization = `bearer ${this.loginSv.user?.tokenId || this.accountToken}`;
      } else {
        opts = {};
      }
      opts.version = `${environment.version}`;
      const get = this.http.get(`${url}`, { headers: opts }).subscribe((res) => {
        get.unsubscribe();
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  async getLocations(uri){
    try{
      return new Promise<any[]>((resolve, reject) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this._countriesApiKey}`
        })
        this.uri = uri;
        this.http.get(`https://www.universal-tutorial.com/api/${uri}`, {headers})
          .subscribe((data: any) => {
            const location: any[] = data;
            location.map(item => {
              item.name = item?.country_name;
              item.fixedName = this.removeAccents(item?.country_name);
            });
            resolve(location);
          }, async (err) => {
            console.log('err :>> ', err);
            await this.getToken();
            reject( [{ err: true }] );
          })
      })
    }catch(err){
      console.error(err);
      if(err.status === 404){
        return [{error: true}];
      }
      const res = await this.getToken();
      return [{error: res}];
    }
  }

  async getStates(country, state = '', returnAll?){
    try{
      const body = {
        'signature': 'RyR',
        'version': environment.version
      };
      let states: any[] = await this.post(`${this._url}/knowCities/${country}/${state}`, body);
      console.log(states);
      if(returnAll) return states;
      states = states.map(item => {
        item = {
          name: !state ? item : item.city,
          city_ascii: item?.city_ascii,
          fixedName: this.removeAccents(!state ? item : item.city),
          id: item.id
        }
        return item;
      });
      
      return states;
    }catch(err){
      console.error(err);
      
    }
  }

  removeAccents(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  async getToken(){
    try{
      const headers = new HttpHeaders({
        "Accept": "application/json",
        "api-token": `${this._accountApiKey}`,
        "user-email": "theapsu@gmail.com"
      });
      const key = await this.getExternal('https://www.universal-tutorial.com/api/getaccesstoken', headers);
      this._countriesApiKey = key.auth_token;
      return true;
    }catch(err){
      console.error(err);
    }
  }
}
