import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcTotalPipe } from './calc-total.pipe';
import { AmountCartPipe } from './amount-cart.pipe';

const declarations = [
  CalcTotalPipe,
  AmountCartPipe
]

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations,
})
export class PipesModule { }
