import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPageRoutingModule } from './business-routing.module';

import { BusinessPage } from './business.page';
import { GeneralComponentsModule } from 'src/app/general/components/general-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessPageRoutingModule,
    GeneralComponentsModule
  ],
  declarations: [BusinessPage]
})
export class BusinessPageModule {}
