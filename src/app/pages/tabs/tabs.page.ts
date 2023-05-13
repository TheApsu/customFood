import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CartService } from 'src/app/services/general/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public tabBtns = [
    {
      tab: 'account',
      name: 'person',
      btn: 'Perfil'
    },
    {
      tab: 'home',
      name: 'home',
      btn: 'Home'
    },
    {
      tab: 'favorite',
      name: 'heart',
      btn: 'Favoritos'
    },
    {
      tab: 'resume',
      name: 'cart',
      btn: 'Carrito'
    },
  ]

  constructor(
    public favoriteSv: FavoriteService,
    public cartSv: CartService
  ) { }

  ngOnInit() {
  }

}
