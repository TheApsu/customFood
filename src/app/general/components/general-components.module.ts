import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarrouselPaisesComponent } from './carrousel-paises/carrousel-paises.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountriesComponent } from './location/countries.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginSocialComponent } from './login-social/login-social.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SlidesCardComponent } from './slides-card/slides-card.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { SquareCardComponent } from './square-card/square-card.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SwiperModule } from 'swiper/angular';
import { AddBtnComponent } from './add-btn/add-btn.component';
import { CategoriesComponent } from './categories/categories.component';
import { BusinessProductSectionComponent } from './business-product-section/business-product-section.component';
import { FavoriteCardComponent } from './favorite-card/favorite-card.component';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';

const declarations = [
  CarrouselPaisesComponent,
  CountriesComponent,
  WelcomeComponent,
  HeaderComponent,
  LoginEmailComponent,
  LoginSocialComponent,
  AppHeaderComponent,
  SearchbarComponent,
  SlidesCardComponent,
  BusinessCardComponent,
  ProductCardComponent,
  DetailProductComponent,
  SquareCardComponent,
  UserFormComponent,
  AddBtnComponent,
  CategoriesComponent,
  BusinessProductSectionComponent,
  FavoriteCardComponent,
  FavoriteProductComponent
]

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  exports: declarations
})
export class GeneralComponentsModule { }
