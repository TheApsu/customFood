import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { IonicModule } from '@ionic/angular';
import { OrderListComponent } from './order-list/order-list.component';

const declarations = [
  OrderDetailComponent,
  OrderListComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class OrdersComponentsModule { }
