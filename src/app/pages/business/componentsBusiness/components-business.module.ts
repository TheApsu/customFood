import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card/product-card.component';
import { DetailProductComponent } from 'src/app/pages/business/componentsBusiness/detail-product/detail-product.component';
import { AddBtnComponent } from 'src/app/pages/business/componentsBusiness/add-btn/add-btn.component';
import { SwiperModule } from 'swiper/angular';

const declarations = [
  InfoComponent,
  ProductCardComponent,
  DetailProductComponent,
  AddBtnComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ],
  exports: declarations
})
export class ComponentsBusinessModule { }
