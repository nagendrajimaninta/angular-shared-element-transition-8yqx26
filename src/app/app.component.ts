import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimations } from './animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  animations: [ routerAnimations ] 
})
export class AppComponent { 

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData &&   outlet.activatedRouteData['animation'];
  }

}
