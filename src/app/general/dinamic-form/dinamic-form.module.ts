import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinamicFormComponent } from './dinamic-form/dinamic-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

const declarations = [
  DinamicFormComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: declarations
})
export class DinamicFormModule { }
