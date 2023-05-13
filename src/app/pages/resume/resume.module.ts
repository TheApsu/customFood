import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumePage } from './resume.page';
import { ResumePageRoutingModule } from './resume-routing.module';

@NgModule({
  imports: [
    ResumePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ ResumePage ]
})
export class ResumePageModule {}
