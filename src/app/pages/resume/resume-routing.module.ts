import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumePage } from './resume.page';

const routes: Routes = [
  {
    path: '',
    component: ResumePage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      
      {
        path: 'cart/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tabs/resume/home'
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumePageRoutingModule {}
