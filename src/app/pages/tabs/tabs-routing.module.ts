import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../../folder/folder.module').then( m => m.FolderPageModule)
          }
        ]
      },
      {
        path: 'business/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../business/business.module').then( m => m.BusinessPageModule)
          }
        ]
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: () => import('../favorite/favorite.module').then( m => m.FavoritePageModule)
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
