import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { FavoriteComponentsModule } from './favorite-components/favorite-components.module';
import { GeneralComponentsModule } from 'src/app/general/components/general-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    FavoriteComponentsModule,
    GeneralComponentsModule
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
