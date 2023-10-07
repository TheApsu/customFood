import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/general/services/ui.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  public orders = [1];

  constructor(
    private uiSv: UiService
  ) { }

  ngOnInit() {}

  openOrder(order){
    this.uiSv.showModal(OrderDetailComponent)
  }
}
