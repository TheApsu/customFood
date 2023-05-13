import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-store',
  templateUrl: './cart-store.component.html',
  styleUrls: ['./cart-store.component.scss'],
})
export class CartStoreComponent implements OnInit {
  @Input() store: any = undefined;

  constructor() { }

  ngOnInit() {
  }

}
