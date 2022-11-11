import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot, RouteReuseStrategy } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CustomRouteReuseStrategy } from './re-use-strategy';

const appRoutes: Routes = [
  {
    path: '', 
    component: ProductListComponent,
    data: {
      animation: 'plp',
      reuse: true
    }
  },
  {
    path: 'product-detail/:id', 
    component: ProductDetailsComponent,
    data: {
      animation: 'pdp'
    },
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ]
})
export class RoutingModule { }

