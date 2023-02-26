import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/general/services/storage.service';
import { CartData, Store } from 'src/app/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private storageSv: StorageService
  ) { }

  async addProduct(data: Store){
    let cart: Store[] = this.storageSv.getLocalStorage('cart');
    if(cart){
      console.log(cart);
      
      let store: Store = cart.find(data => data.storeId === data.storeId);
      const storingProduct = data.products[0];
      const product = store.products.find(product => product.id === storingProduct.id);
      if(product){
        storingProduct.quantity += product.quantity;
        store.products = store.products.filter(product => product.id !== storingProduct.id)
      }

      cart = cart.filter(data => data.storeId !== data.storeId);
      cart.push(store);
      store.products.push(storingProduct);
    }else{
      cart = [data];
    }
    this.storageSv.setLocalStorage(!!cart, 'cart', cart);
  }
}
