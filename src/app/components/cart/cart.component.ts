import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductCart } from '../../model/product-cart.model';
import { getProduct, setProduct } from '../../store/product.actions';
import { ProductStoreService } from '../../services/products-services/product-store.service';
import { selectProduct } from '../../store/product.selectors';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
    private destroy$ = new Subject<void>();

    public product$: Observable<ProductCart[]>;

    private store = inject(Store);
    public productsInStore: any = [];

    private productsService = inject(ProductStoreService);

    constructor() {
        this.store.dispatch(getProduct());

        this.product$ = this.store.select(selectProduct);
    }

    ngOnInit(): void {
        this.getCart();
    }

    private getCart(): void {
        this.product$.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
            this.productsInStore = res;
        });
    }

    public removeSingleItem(productId: number): void {
        this.productsInStore =
            this.productsService.removeProductFromCart(productId);

        this.store.dispatch(setProduct({ product: this.productsInStore }));

        this.store.dispatch(getProduct());
    }
}
