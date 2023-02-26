import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _countriesApiKey = environment.countriesApiKey;
  private _accountApiKey = environment.accountKey;
  private _uri = undefined;
  private _url = environment.url;
  private accountToken = environment.accountToken;

  constructor(
    private http: HttpClient,
    private loginSv: LoginService
  ) { }

  post(url, body, opts?){
    return new Promise<any>((resolve, reject) => {
      opts && (opts.Authorization = `bearer ${this.loginSv.user?.tokenId || this.accountToken}`);
      const post = this.http.post(url, body,{ headers: opts }).subscribe((res) => {
        post.unsubscribe();
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  } 

  get(url, opts?){
    return new Promise<any>((resolve, reject) => {
      opts && (opts.Authorization = `bearer ${this.loginSv.user?.tokenId || this.accountToken}`);
      const get = this.http.get(url, { headers: opts }).subscribe((res) => {
        get.unsubscribe();
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  async getLocations(uri){
    try{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this._countriesApiKey}`
      })
      this._uri = uri;
      const location: any[] = await this.get(`https://www.universal-tutorial.com/api/${uri}`, headers);
      console.log(location);
      location.map(item => {
        item.name = item?.country_name;
        item.fixedName = this.removeAccents(item?.country_name);
      });
      return location;
    }catch(err){
      console.error(err);
      
      if(err.status === 404){
        return [{error: true}];
      }
      const res = await this.getToken();
      return [{error: res}];
    }
  }

  async getStates(shortname, country = ''){
    try{
      const body = {
        'signature': 'RyR'
      };
      let states: any[] = await this.post(`${this._url}/knowCities/${shortname}/${country}`, body);
      console.log(states);
      
      states = states.map(item => {
        item = {
          name: !country ? item : item.city,
          city_ascii: item?.city_ascii,
          fixedName: this.removeAccents(!country ? item : item.city),
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
      const key = await this.get('https://www.universal-tutorial.com/api/getaccesstoken', headers);
      this._countriesApiKey = key.auth_token;
      return true;
    }catch(err){
      console.error(err);
    }
  }
}
