import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationBuilder, animate, style, keyframes, query, AnimationStyleMetadata, group, animateChild } from '@angular/animations';
import { SharedElementService } from '../shared-element/shared-element.service';
import { CanDeactivateComponent } from '../routing/can-deactivate.guard';
import carsData from '../cars';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements
 OnInit,
 CanDeactivateComponent {

  @ViewChild('carPhoto') carPhoto: ElementRef;

  animating: boolean;

  animationMetaData: AnimationStyleMetadata[];

  public get car() {
    return carsData
    .find(car => (car as any).id === + this.route.snapshot.params['id']);
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private animationBuilder: AnimationBuilder,
    private el: ElementRef,
    private sharedElementService: SharedElementService
  ) { }

  ngOnInit() {
    console.log(this.router.getCurrentNavigation());
  }

  ngAfterViewInit() {

    const carPhotoDataSource = this.sharedElementService.getSharedElementData('car-photo');

    const carPhotoDataDest = this.sharedElementService.getElementPositioning(this.carPhoto.nativeElement);
    
    this.animationMetaData = [
      style({
        ...carPhotoDataSource,
      }),
      style({
        ...carPhotoDataDest,
        left: carPhotoDataDest.left + 7.5,
      })
    ]
    
   
    const animation = this.animationBuilder.build([
      group([
        query('*:not([data-attr])', [
          style({
            opacity: 0
          }),
          animate('300ms', style({
            opacity: 1,
          }))
        ]),
        query('[data-attr=car-photo-target]', [
          style({ position: 'absolute' }),
          animate('300ms', keyframes(this.animationMetaData) )
        ])
      ])
    ]);

    const player = animation.create(this.el.nativeElement);

    player.onStart(() => this.animating = true );

    player.play();

    player.onDone(() => {
      this.animating = false;

      player.reset();
    });
  
  }

  back() {
     this.location.back();
  }

  canDeactivate() {
    return new Promise<boolean>((resolve, reject) => {
      const animationMetaData = this.animationMetaData.reverse();

      const animation = this.animationBuilder.build([
        query('*:not([data-attr=car-photo-target])', animate('300ms', style({
          opacity: 0
        }))),
        query('[data-attr=car-photo-target]', [
          style({ position: 'absolute', opacity: 1 }),
          animate('300ms', keyframes(animationMetaData) )
        ]),
      ]);

      const player = animation.create(this.el.nativeElement);

      player.play();

      player.onDone(() => resolve(true));
    });
  }
}