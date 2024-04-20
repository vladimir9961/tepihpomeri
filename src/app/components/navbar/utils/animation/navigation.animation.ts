import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeNavigation = trigger('fadeNavigation', [
  state('true', style({ opacity: 1 })),
  state('false', style({ opacity: 0 })),
  transition('false => true', animate('300ms ease-in-out')),
  transition('true => false', animate('0ms ease-in-out'))
  ]);
  
  export const slideInOutNavigation = trigger('slideInOutNav', [
    state('true', style({ transform: 'translateY(0)'})),
    state('false', style({ transform: 'translateY(-45px)' })),
    transition('false => true', animate('300ms ease-in-out')),
    transition('true => false', animate('300ms ease-in-out'))
  ]);