import { CommonModule} from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';

// Constants
import { socialIcons } from '../../utils/constants/social-icons.constants';

// Models
import { navigationIcons } from '../../model/navigation-icons.model';
import { ActivationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

// Animations
import { fade, slideInOut } from '../../helper/animations/mobile.animation';
import { fadeNavigation, slideInOutNavigation } from './utils/animation/navigation.animation';

// Helper
import { handleScroll } from '../../helper/detectScroll';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [fade, slideInOut, fadeNavigation, slideInOutNavigation]

})
export class NavbarComponent implements OnInit{
  private destroy$ = new Subject<void>();
  
  public router: Router = inject(Router)

  public icons: navigationIcons[] = socialIcons.SOCIAL_ICONS;

  public isMobileMenuOpen: boolean = false;
  public isDropdownOpen: boolean = false;

  private previousScrollPosition: number = 0;

  public isBottomNavFixed: boolean = false;
  public isScrolledToTop: boolean = true;
  public isMagiceLineHovered: boolean = false;

  public isCurrentRouteHome: boolean = false;

  constructor(){ 
    this.router.events
    .pipe(takeUntil(this.destroy$))
    .subscribe((event: any) => {
      if (event instanceof ActivationEnd && event.snapshot && event.snapshot.routeConfig) {
        if(event.snapshot.routeConfig.path === 'pocetna') {
          this.isCurrentRouteHome = true
        } else {
          this.isCurrentRouteHome = false
        }
      }
    });
  }

  ngOnInit(): void {
    this.onWindowScroll()
  }

  @HostListener('document:click', ['$event'])
  public clickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.closeDropdown();
    }
  }

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll(): void {
    const { isBottomNavFixed, isScrolledToTop, previousScrollPosition } = handleScroll(this.previousScrollPosition, this.isBottomNavFixed, this.isScrolledToTop);
    this.isBottomNavFixed = isBottomNavFixed;
    this.isScrolledToTop = isScrolledToTop;
    this.previousScrollPosition = previousScrollPosition;
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
  
}
