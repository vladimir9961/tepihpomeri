import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetProductsService } from '../../services/products-services/get-products.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private destroy$ = new Subject<void>();

  public products: any = []

  constructor(private _getProducts: GetProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this._getProducts.getProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe(getProducts => {
      this.products = getProducts
    })
  }
}
