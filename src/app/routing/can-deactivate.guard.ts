import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot 
      }  from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean | Promise<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {

  canDeactivate(
    component: CanDeactivateComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if ( component.canDeactivate ) {
      return component.canDeactivate();
    } else {
      return true;
    }
  }
}