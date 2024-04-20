import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';

// Constants
import { socialIcons } from './utils/constants/social-icons.constants';

// Models
import { navigationIcons } from './utils/model/navigation-icons.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Animations
import { fade, slideInOut } from '../../helper/animations/mobile.animation';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [slideInOut, fade]

})
export class NavbarComponent{
  public icons: navigationIcons[] = socialIcons.SOCIAL_ICONS;

  public isMobileMenuOpen: boolean = false;
  isDropdownOpen = false;

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.closeDropdown();
    }
  }
}
