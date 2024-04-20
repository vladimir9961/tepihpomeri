import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';

// Constants
import { socialIcons } from '../../constants/social-icons.constants';

// Models
import { navigationIcons } from '../../model/navigation-icons.model';
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
  public isDropdownOpen: boolean = false;

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  public clickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.closeDropdown();
    }
  }
}
