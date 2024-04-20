import { CommonModule, Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';

// Constants
import { socialIcons } from '../../constants/social-icons.constants';

// Models
import { navigationIcons } from '../../model/navigation-icons.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// Animations
import { fade, slideInOut } from '../../helper/animations/mobile.animation';
import { fadeNavigation, slideInOutNavigation } from './utils/animation/navigation.animation';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [fade, slideInOut, fadeNavigation, slideInOutNavigation]

})
export class NavbarComponent{
  public icons: navigationIcons[] = socialIcons.SOCIAL_ICONS;

  public isMobileMenuOpen: boolean = false;
  public isDropdownOpen: boolean = false;

  private previousScrollPosition: number = 0;

  public isBottomNavFixed: boolean = false;
  public isScrolledToTop: boolean = true;
  public isMagiceLineHovered: boolean = false;

  currentRouteName: string = '';

  constructor(private readonly location: Location){ }

  ngOnInit(): void {
    this.onWindowScroll()

    this.getCurrentRouteName()
  }

  @HostListener('document:click', ['$event'])
  public clickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.closeDropdown();
    }
  }


  @HostListener('window:scroll', ['$event'])
  private onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
      if (currentScrollPosition > this.previousScrollPosition) {

        this.isBottomNavFixed = true;
        this.isScrolledToTop = true;
      } else if (currentScrollPosition < this.previousScrollPosition) {
      
        if (currentScrollPosition === 0) {
          this.isScrolledToTop = false;
        }
        this.isBottomNavFixed = false;
      }
    
      this.previousScrollPosition = currentScrollPosition;
    }
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  public magic_line(showHideMagicLIne: boolean): void {
    this.isMagiceLineHovered = showHideMagicLIne
  }
  
  public getCurrentRouteName(): void {
    const currentUrl = this.location.path();
    const segments = currentUrl.split('/');
    this.currentRouteName = segments[segments.length - 1];
}
}
