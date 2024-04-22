import { trigger, style, animate, transition } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('0.3s ease-in', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({ transform: 'translateX(100%)', width: '100%' }))
  ])
]);

export const fade = trigger('fade', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s ease', style({ opacity: 1 })) 
    ]),
    transition(':leave', [
      animate('0s ease', style({ opacity: 0 }))
    ])
  ]);
