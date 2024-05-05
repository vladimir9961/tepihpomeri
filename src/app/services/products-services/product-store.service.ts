import { inject, Injectable } from '@angular/core';
import { getProduct, setProduct } from '../../store/product.actions';
import { selectProduct } from '../../store/product.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductCart, Products } from '../../model/product-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  public productsInStore: any = []

  private store = inject(Store)
  public product$: Observable<ProductCart[]>
  public isSelectedAlredy: boolean = false

  constructor() { 
    
    this.store.dispatch(getProduct());

    this.product$ = this.store.select(selectProduct);
  }


  public removeProductFromCart(productId: number): Products[] | any {
    this.productsInStore = this.productsInStore.filter((product: { id: number; }) => product.id !== productId);
    
    localStorage.setItem('products', JSON.stringify(this.productsInStore));

    this.store.dispatch(setProduct({product: this.productsInStore}));

    this.store.dispatch(getProduct());

  }

  public addProduct(product: any, counter: number): void {
    if(!this.checkIfProductIsAlredyInStore(product.id)){
      let addProduct =  { 
        id: product.id,
        name: product.name, 
        description: product.description,
        image: product.images[0], 
        quantity: counter
      }

        this.productsInStore = [
          ...this.productsInStore,
          addProduct
        ];

        localStorage.setItem('products', JSON.stringify(this.productsInStore));

        this.store.dispatch(setProduct({product: this.productsInStore}));

        this.store.dispatch(getProduct());

        return this.productsInStore
    }
  }

  private checkIfProductIsAlredyInStore(productId: number): boolean {
    return this.productsInStore.some((product: { id: number; }) => product.id === productId);
  }
}
