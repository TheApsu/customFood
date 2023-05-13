import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { IonicModule } from '@ionic/angular';
import { SavedDirectionsComponent } from 'src/app/folder/folder-components/saved-directions/saved-directions.component';
import { DinamicFormModule } from 'src/app/general/dinamic-form/dinamic-form.module';
import { AddNewDirectionComponent } from 'src/app/folder/folder-components/add-new-direction/add-new-direction.component';
import { ChangeCityComponent } from 'src/app/folder/folder-components/change-city/change-city.component';

const declarations = [
  UserFormComponent,
  SavedDirectionsComponent,
  AddNewDirectionComponent,
  ChangeCityComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    DinamicFormModule
  ],
  exports: declarations
})
export class FolderComponentsModule { }
