import { CommonModule} from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

// Modules
import { AngularSvgIconModule } from 'angular-svg-icon';

// Constants
import { socialIcons } from '../../utils/constants/social-icons.constants';

// Enums
import { product_enums } from '../../utils/enums/products.enums';

// Models
import { navigationIcons } from '../../model/navigation-icons.model';
import { ActivationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

// Animations
import { fade, slideInOut } from '../../helper/animations/mobile.animation';
import { fadeNavigation, slideInOutNavigation } from './utils/animation/navigation.animation';

// Helper
import { handleScroll } from '../../helper/detectScroll';

// Store
import { Store } from '@ngrx/store';
import { ProductCart, Products } from '../../model/product-cart.model';

// Components
import { CartComponent } from '../cart/cart.component';
import { getProduct } from '../../store/product.actions';
import { selectProduct } from '../../store/product.selectors';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    AngularSvgIconModule, 
    RouterLink, 
    RouterLinkActive,
    CartComponent
  ],
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
  
  public product$: Observable<ProductCart[]>
  
  public cart: Products[] = []
  public isCartOpened: boolean = false

  private store = inject(Store)
  
  constructor(){ 
    this.checkRoute()

    this.store.dispatch(getProduct());

    this.product$ = this.store.select(selectProduct);
  }

  ngOnInit(): void {
    this.onWindowScroll()

    this.getCart()
  }

  private getCart(): void {
    this.product$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res: any) =>{ 
      this.cart = res
    })
  }

  public openCart(): void {
    this.isCartOpened = !this.isCartOpened
  }

  public checkRoute(): void {
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
