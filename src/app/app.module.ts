import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RoutingModule } from './routing/routing.module';
import { SharedElementDirective } from './shared-element/shared-element.directive';
import { SharedElementService } from './shared-element/shared-element.service';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RoutingModule
  ],
  declarations: [ AppComponent, ProductListComponent, ProductDetailsComponent, SharedElementDirective ],
  bootstrap:    [ AppComponent ],
  providers: [SharedElementService]
})
export class AppModule { }
