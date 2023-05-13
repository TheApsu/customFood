import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/general/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage{
  public store = undefined;

  constructor(
    private cartSv: CartService,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter(){
    this.getStore();
  }

  async getStore(){
    if(!this.cartSv.cart.length) await this.cartSv.getCart();
    const businessId = this.route.snapshot.paramMap.get('id');
    this.store = this.cartSv.cart.find(x => x.businessId === businessId);
  }

  trackByItems(index, item){
    return item.businessId;
  }

  continue(){
    
  }

}
