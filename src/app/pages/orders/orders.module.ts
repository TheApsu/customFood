import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { GeneralComponentsModule } from 'src/app/general/components/general-components.module';
import { OrdersComponentsModule } from './orders-components/orders-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    GeneralComponentsModule,
    OrdersComponentsModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
