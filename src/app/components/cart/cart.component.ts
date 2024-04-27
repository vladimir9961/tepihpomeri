import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { product_enums } from '../../utils/enums/products.enums';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductCart } from '../../model/product-cart.model';
import { setProduct } from '../../store/product.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private destroy$ = new Subject<void>();

  public product$: Observable<ProductCart[]>

  private store = inject(Store)
  public productsInStore: ProductCart[] = [];
  
  constructor() {
    this.product$ = this.store.select(product_enums.CART);
  }

  ngOnInit(): void {
    this.getCart()
  }

  private getCart(): void {
    this.product$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((res: any) =>{ 
      this.productsInStore = res.product
    })
  }

  public removeSingleItem(productId: number): void{
    this.productsInStore = this.productsInStore.filter(product => product.id !== productId);

    this.store.dispatch(setProduct({product: this.productsInStore}));
  }
}
