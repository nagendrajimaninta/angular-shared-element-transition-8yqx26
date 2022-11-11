import {
  trigger, animateChild, group,
  transition, animate, style, query,
  sequence
} from '@angular/animations';

/**
 * We have PLP and PDP
 * 
 * When navigatinng to the PDP, the PDP will all be transparent initially
 * but will ensure the shared element is visible. The shared element in the 
 * PDP will be placed in the same exact location as it was in the PDP
 */


const angular_animation =  [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':leave', [
    style({ 
      position: 'absolute',
      display: 'block',
      // backgroundColor: 'red'
    })
  ]),
  query(':enter', [
    style({ left: '-100%' })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave *', [
      animate('300ms ease-out', style({ 
        //  backgroundColor: 'green'
       }))
    ]),
    query(':leave .target, :leave .target *', [
      animate('300ms ease-out', style({ 
        //  backgroundColor: 'blue'
       }))
    ]),
    query(':enter', [
      animate('300ms ease-out', style({  }))
    ])
  ]),
  query(':enter', animateChild()),
];

const custom_animation = [
    style({
      position: 'relative'
    }),
    query(':leave', [
      style({
        transform: 'rotate(90deg)'
        // opacity: 0,
        // backgroundColor: 'red'
      })
    ]),
    query(':enter', [
      style({
        // opacity: 0,
        // display: 'none',
        backgroundColor: 'red',
        position: 'absolute',
        top: 0
      })
    ]),
    query(':leave', style({
      backgroundColor: 'green'
    })),
    // query(':enter', animateChild()),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('10000ms ease-out', style({
          // display: 'none'
          backgroundColor: 'red'
        }))
      ]),
      query(':enter', [
        animate('10000ms ease-out', style({
          display: 'none'
        }))
      ])
    ]),
];

// Routable animations
export const routerAnimations = trigger('routeAnimation', [
    // transition('plp => pdp', [])
  ]
);


const fadeInSteps = [
  style({
    opacity: 0
  }),
  animate(`300ms`, style({
    opacity: 1
  }))
];

const fadeOutSteps = [
  animate(`300ms`, style({
    opacity: 0
  }))
];

/**
 * Fade in out animations trigger which is based on :enter and :leave life cycle events
 */
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', fadeInSteps),
  transition(':leave', fadeOutSteps)
]);
