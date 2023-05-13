import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { IonicModule } from '@ionic/angular';
import { SearchbarComponent } from 'src/app/pages/home/home-components/searchbar/searchbar.component';
import { SlidesCardComponent } from 'src/app/pages/home/home-components/slides-card/slides-card.component';
import { BusinessCardComponent } from 'src/app/pages/home/home-components/business-card/business-card.component';
import { SwiperModule } from 'swiper/angular';
import { CategoriesComponent } from 'src/app/pages/home/home-components/categories/categories.component';
import { FormsModule } from '@angular/forms';

const declarations = [
  AppHeaderComponent,
  SearchbarComponent,
  SlidesCardComponent,
  BusinessCardComponent,
  CategoriesComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    FormsModule
  ],
  exports: declarations
})
export class HomeComponentsModule { }
