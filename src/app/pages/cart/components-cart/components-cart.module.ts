import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCardComponent } from './cart-card/cart-card.component';
import { IonicModule } from '@ionic/angular';
import { CartCardProductComponent } from './cart-card-product/cart-card-product.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const declarations = [
  CartCardComponent,
  CartCardProductComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: declarations
})
export class ComponentsCartModule { }
