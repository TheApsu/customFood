import { Injectable } from '@angular/core';
import { StorageService } from '../general/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _favorites = [];
  get favorites(){
    return this._favorites
  }

  set favorites(value){
    this._favorites = value;
  }

  constructor(
    private storageSv: StorageService
  ) {
    this.favorites = this.storageSv.getLocalStorage('favorites');
  }

  addFavorite(data){
    const existFavorite = this.favorites
    const product = data.products[0];
    let favorites: any[] = existFavorite;
    if(favorites){
      const index = favorites.findIndex(favorite => favorite.storeId === data.storeId);
      if(index !== -1){
        const store = favorites[index];
        if(!data.favorite){
          store.products = store.products.filter(favorite => favorite.id !== data.id);
        }else{
          store.products.push(product);
        }
        favorites[index] = store;
        if(!store.products.length){
          favorites.splice(index, 1);
        }
      }else{
        favorites.push(data);
      }
    }else{
      favorites = [data];
    }
    this.favorites = favorites;
    this.storageSv.setLocalStorage(true, 'favorites', favorites);
  }

  verifyFavorite(data){
    let favorite = false;
    if(this.favorites){
      const store = this.favorites.find(favorite => favorite.storeId === data.storeId);
      if(store){
        const product = store.products.find(product => product.id === data.id);
        favorite = !!product;
      }
    }
    const icon = favorite ? 'heart' : 'heart-outline';
    return icon;
  }
}
