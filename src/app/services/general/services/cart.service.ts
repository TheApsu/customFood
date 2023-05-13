import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/general/services/http.service';
import { LocationService } from 'src/app/general/services/location.service';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart = [];

  set cart(value){
    this._cart = value || [];
  }

  get cart(){
    return this._cart;
  }

  constructor(
    private httpSv: HttpService,
    private locationSv: LocationService,
    private loginSv: LoginService
  ) { }

  async addProduct(data, product){
    const productToAdd = {
      iso2: this.locationSv.location.country.name,
      admin_name_ascii: this.locationSv.location.state.name,
    
      businessId: data.business?._id || data.business?.businessId,
      full_name: data.business.full_name,
      short_name: data.business.short_name,
      imgUrlLogo: data.business.imgUrlMain,
    
      productsToBuy: data.products
    }

    // Verificando si existe el producto para enviarlo al update

    const store = this.cart.find(store => store.businessId === productToAdd.businessId);
    if(store){
      const productSaved = store.productsToBuy.find(savedProduct => savedProduct._id === product.productId);
      if(productSaved){
        this.update(productToAdd, product, productSaved);
        return true;
      }
    }

    await this.makeReq(productToAdd, '/buyer/carrito/add');
  }

  async update(productToAdd, product, productSaved){
    const body = {
      businessId: productToAdd.businessId,
      productId: productSaved._id,
      amount: productSaved.amount += product.amount
    }
    
    await this.makeReq(body, '/buyer/carrito/update');
  }

  async makeReq(body, uri){
    await this.httpSv.post(null, body, null, uri);
    await this.getCart();
  }

  async removeProduct(productId, storeId){
    const store = this._cart.find(x => x.businessId === storeId);
    const body = {
      productId,
      businessId: store.businessId,
      amount: store.productsToBuy.find(x => x._id === productId).amount,
      removeStore: store.productsToBuy.length > 1 ? false : true
    }
    await this.httpSv.post(null, body, null, '/buyer/carrito/remove');
    await this.getCart();
    return body.removeStore;
  }

  async removeStore(businessId){
    const body = {
      businessId,
      removeStore: true
    }
    await this.httpSv.post(null, body, null, '/buyer/carrito/remove');
    await this.getCart();
    return true;
  }

  async getCart(){
    if(!this.loginSv.user) return;
    const newCart = await this.httpSv.get(`buyer/carrito/get/${this.loginSv.user.uid}`);
    this.cart = newCart;
    console.log('newCart :>> ', newCart);
  }
}
