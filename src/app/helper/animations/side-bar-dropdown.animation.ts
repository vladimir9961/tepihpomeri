import { trigger, state, style, transition, animate } from "@angular/animations";

export const toggleDropdownAnimation = trigger('toggleDropdown', [
  state('open', style({
    maxHeight: '100%',
    opacity: 1,
    transform: 'translateY(0)',
    display: 'grid'
  })),
  
  state('closed', style({
    maxHeight: '0',
    opacity: 0,
    transform: 'translateY(-20px)',
    display: 'none'
  })),

  transition('closed => open', [
    animate('0.3s')
  ]),
  transition('open => closed', [
    animate('0.3s')
  ])
]);