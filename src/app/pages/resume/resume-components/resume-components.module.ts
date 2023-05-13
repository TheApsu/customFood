import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStoreComponent } from './cart-store/cart-store.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

const declarations = [
  CartStoreComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: declarations
})

export class ResumeComponentsModule { }
