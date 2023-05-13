import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrouselPaisesComponent } from './carrousel-paises/carrousel-paises.component';
import { IonicModule } from '@ionic/angular';
import { CountriesComponent } from 'src/app/pages/location/location-components/location/countries.component';
import { HeaderComponent } from 'src/app/pages/location/location-components/header/header.component';
import { HomeComponentsModule } from '../../home/home-components/home-components.module';

const declarations = [
  CarrouselPaisesComponent,
  CountriesComponent,
  HeaderComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    HomeComponentsModule
  ],
  exports: declarations
})
export class LocationComponentsModule { }
