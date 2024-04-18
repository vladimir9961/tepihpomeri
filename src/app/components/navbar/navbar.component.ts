import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
