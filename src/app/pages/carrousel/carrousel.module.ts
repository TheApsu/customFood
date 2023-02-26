import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarrouselPageRoutingModule } from './carrousel-routing.module';

import { CarrouselPage } from './carrousel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarrouselPageRoutingModule
  ],
  declarations: [CarrouselPage]
})
export class CarrouselPageModule {}
