import { Injectable } from '@angular/core';
import { StorageService } from '../general/services/storage.service';
import { Product, Store } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _favorites = [];
  private _total = 0;
  get favorites(){
    return this._favorites
  }

  get total(){
    return this._total
  }

  set total(value){
    this._total = value;
  }

  set favorites(value){
    this._favorites = value;
  }

  constructor(
    private storageSv: StorageService
  ) {
    this.favorites = this.storageSv.getLocalStorage('favorites') || [];
    this.checkTotal();
  }

  checkTotal(){
    this.total = 0;
    this.favorites.forEach(store => {
      this.total += store.products.length;
    })
  }

  addFavorite(data){
    let favorites = this.favorites;
    const product = data.products[0];
    if(favorites.length){
      const index = favorites.findIndex(favorite => favorite.storeId === data.storeId);
   
      if(index !== -1){
        const store: Store = favorites[index];
        console.log('store :>> ', store);
        console.log('data :>> ', data);
        if(!data.favorite){
          store.products = store.products.filter(favorite => favorite._id !== data._id);
          console.log('store.products :>> ', store.products);
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
        const product = store.products.find((product: Product) => product._id === data._id);
        favorite = !!product;
      }
    }
    const icon = favorite ? 'heart' : 'heart-outline';
    this.checkTotal();
    return icon;
  }

  checkToAdd(favoriteIcon, product, business){
    const favorite = favoriteIcon === 'heart' ? false : true;
    const obj = { 
      _id: product._id,
      favorite, 
      businessName: business.full_name,
      businessImg: business.imgUrlMain,
      storeId: business.storeId || business._id,
      products: [ product ]
    }
    console.log('business :>> ', business);
    this.addFavorite(obj);
    favoriteIcon = this.verifyFavorite(obj);
    return favoriteIcon;
  }
}
