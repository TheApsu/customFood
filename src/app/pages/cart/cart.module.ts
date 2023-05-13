import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ComponentsCartModule } from './components-cart/components-cart.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { GeneralComponentsModule } from 'src/app/general/components/general-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ComponentsCartModule,
    PipesModule,
    GeneralComponentsModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
