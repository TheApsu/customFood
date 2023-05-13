import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ResumeComponentsModule } from '../resume-components/resume-components.module';
import { GeneralComponentsModule } from 'src/app/general/components/general-components.module';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ResumeComponentsModule,
    GeneralComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
