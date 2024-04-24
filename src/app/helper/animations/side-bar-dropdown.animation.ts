import { trigger, state, style, animate, transition } from '@angular/animations';

export const toggleDropdownAnimation = trigger('toggleDropdown', [
  state('open', style({
    maxHeight: '500px',
  })),
  
  state('closed', style({
    maxHeight: '0',
  })),

  transition('closed => open', [
    animate('0.3s') 
  ]),
  transition('open => closed', [
    animate('0.3s')
  ])
]);


export const expandSideBar = trigger('expandSideBar', [
  state('open', style({
    transform: 'translateX(0)',
  })),
  
  transition('closed => open', [
    animate('0.3s') 
  ]),
  transition('open => closed', [
    animate('0.3s')
  ])
]);