import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/general/services/ui.service';
import { CartService } from 'src/app/services/general/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public cartSv: CartService,
    private uiSv: UiService
  ) { }

  async ngOnInit() {
    if(!this.cartSv.cart.length) {
      await this.uiSv.showLoading();
      await this.cartSv.getCart();
      await this.uiSv.loading.dismiss();
    }
  }
}
