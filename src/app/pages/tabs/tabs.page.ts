import { Component, OnInit } from '@angular/core';

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
      tab: 'cart',
      name: 'cart',
      btn: 'Carrito'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
