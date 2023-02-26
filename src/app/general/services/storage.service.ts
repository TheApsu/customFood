import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
  ) { }

  setLocalStorage(saveItem: boolean, name: any, item?){
    item = JSON.stringify(item);
    if(saveItem){
      localStorage.setItem(name, item);
    }else if(!saveItem){
      localStorage.removeItem(name);
    }
  }

  getLocalStorage(name){
    const data = JSON.parse(localStorage.getItem(name));
    return data;
  }
}
