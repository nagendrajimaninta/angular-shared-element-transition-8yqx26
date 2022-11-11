import { Component, OnInit } from '@angular/core';
import carsData from '../cars';
import { Router } from '@angular/router';
import { fadeInOut } from '../animations';
import { SharedElementService } from '../shared-element/shared-element.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [fadeInOut]
})
export class ProductListComponent implements OnInit {
  cars = carsData;

  constructor(private router: Router, private sharedElementService: SharedElementService) { }

  ngOnInit() {
  }

  moreDetails(carId: number, img: HTMLImageElement) {
    this.router.navigate(['product-detail', carId]);
    this.sharedElementService.createSharedElementTransition('car-photo', img);
  }

  ngOnDestroy() {
    console.log('destroy');
  }

}