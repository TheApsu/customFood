import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrouselPage } from './carrousel.page';

const routes: Routes = [
  {
    path: '',
    component: CarrouselPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarrouselPageRoutingModule {}
