import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoriteProductComponent } from 'src/app/pages/favorite/favorite-components/favorite-product/favorite-product.component';
import { FavoriteCardComponent } from './favorite-card/favorite-card.component';

const declarations = [
  FavoriteCardComponent,
  FavoriteProductComponent
]

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class FavoriteComponentsModule { }
