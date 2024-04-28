import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Services
import { GetProductsService } from '../../services/products-services/get-products.service';

// Models
import { Product } from '../../model/products.model';

// Enums
import { product_enums } from '../../utils/enums/products.enums';

// Components
import { ProductsComponent } from '../../components/products/products.component';
import { PlaceholderComponent } from '../../components/placeholder/placeholder.component';
import { AsideNavComponent } from '../../components/aside-nav/aside-nav.component';
@Component({
  selector: 'app-rugs',
  standalone: true,
  imports: [
    ProductsComponent, 
    PlaceholderComponent,
    AsideNavComponent,
    InfiniteScrollModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
  animations: []
})
export class RugsComponent implements OnInit{
  
  private destroy$ = new Subject<void>();

  public products: Product[] = []

  private productsToDisplay: number = 10
  public isRouteId: number = 0;

  constructor(private _getProducts: GetProductsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getRoute()

    this.getProducts();
  }

  public getRoute(): void {
    this.route
    .data
    .pipe(takeUntil(this.destroy$))
    .subscribe(routeName => this.setRoute(routeName));
  }

  public setRoute(routeName: any): void {
    switch(routeName.name){
      case product_enums.BLANKETS:
        this.isRouteId = 18;
      break;

      default:
        this.isRouteId = 17;
      break
    }
  }

  public tagIsSelected(arrayOfTags: any): void {

    if(arrayOfTags.length > 0) {
      this.products = []
      
      arrayOfTags.forEach((tag: any) => {
        
        this.getProductsByTag(tag.id)
        .pipe(
          takeUntil(this.destroy$))
        .subscribe((getProducts: any) => {

          this.products = [...this.products, getProducts[0]];
        });
      });
    } else {
      this.getProducts()
    }
  }

  private getProductsByTag(tag: number): any {
    return this._getProducts.getProductsRugs(tag, this.productsToDisplay)
    .pipe(
      takeUntil(this.destroy$)
    );
  }

  public onScroll(): void {
    this.productsToDisplay = this.productsToDisplay + 25
    this.getProducts()
  }

  public getProducts(): void {
    this._getProducts.getProductsRugs(this.isRouteId, this.productsToDisplay)
    .pipe(takeUntil(this.destroy$))
    .subscribe(getProducts => {
      this.products = getProducts
    })
  }
}
