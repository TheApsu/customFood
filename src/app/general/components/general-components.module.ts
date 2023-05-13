import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CenteredHeaderComponent } from './centered-header/centered-header.component';

const declarations = [
  CenteredHeaderComponent
]

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: declarations
})
export class GeneralComponentsModule { }
