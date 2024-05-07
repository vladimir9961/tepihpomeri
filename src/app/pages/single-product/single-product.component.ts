import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

// Model
import { Product } from '../../model/products.model';
import { ProductCart } from '../../model/product-cart.model';

// Service
import { GetProductsService } from '../../services/products-services/get-products.service';

// Enums
import { product_enums } from '../../utils/enums/products.enums';

// Store
import { Store } from '@ngrx/store';
import { getProduct, setProduct } from '../../store/product.actions';
import { selectProduct } from '../../store/product.selectors';
import { ProductStoreService } from '../../services/products-services/product-store.service';

@Component({
    selector: 'app-single-product',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, RouterLink],
    templateUrl: './single-product.component.html',
    styleUrl: './single-product.component.scss',
})
export class SingleProductComponent {
    private destroy$ = new Subject<void>();

    public product: any;
    public similarProducts: Product[] = [];
    public counter: number = 1;

    public product$: Observable<ProductCart[]>;
    public productsInStore: any = [];
    public isSelectedAlredy: boolean = false;

    private store = inject(Store);
    private getProductService = inject(GetProductsService);
    private route = inject(ActivatedRoute);
    private productsService = inject(ProductStoreService);

    constructor() {
        this.store.dispatch(getProduct());

        this.product$ = this.store.select(selectProduct);
    }

    ngOnInit(): void {
        this.getProduct();
    }

    private getProduct(): void {
        this.route.params.subscribe((params: any) => {
            this.getProductService
                .getSingleProduct(params.id)
                .pipe(takeUntil(this.destroy$))

                .subscribe((product) => {
                    this.product = product;

                    this.getCart();

                    this.getRelatedProducts(product.related_ids);
                });
        });
    }

    private getCart(): void {
        this.product$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.productsInStore = [];

            if (res.length > 0) this.productsInStore = res;

            this.isSelectedAlredy = this.checkIfProductIsAlredyInStore(
                this.product.id
            );
        });
    }

    private getRelatedProducts(related_ids: number[]): void {
        this.getProductService
            .getRelatedProducts(related_ids)
            .pipe(takeUntil(this.destroy$))
            .subscribe((products) => {
                this.similarProducts = products;
            });
    }

    public counterQuantity(increseDecrese?: string): void {
        switch (increseDecrese) {
            case product_enums.MINUS:
                if (this.counter !== 1) {
                    this.counter -= 1;
                }
                break;

            default:
                this.counter += 1;
                break;
        }
    }

    public addRemoveFromCart(isInCart: boolean, product: any): void {
        if (isInCart) {
            // this.removeProductFromCart(product.id);
            this.productsInStore = this.productsService.removeProductFromCart(
                product.id
            );
        } else {
            this.productsInStore = this.productsService.addProduct(
                product,
                this.counter
            );
            // this.addProductInCart(product)
        }
    }

    // private removeProductFromCart(productId: number): void {
    //   this.productsInStore = this.productsInStore.filter((product: { id: number; }) => product.id !== productId);

    //   localStorage.setItem('products', JSON.stringify(this.productsInStore));

    //   this.store.dispatch(setProduct({product: this.productsInStore}));

    //   this.store.dispatch(getProduct());

    // }

    // private addProductInCart(product: any): void {
    //   this.productsService.addProduct(product, this.counter)
    //   if(!this.checkIfProductIsAlredyInStore(product.id)){

    //     let addProduct =  {
    //       id: product.id,
    //       name: product.name,
    //       description: product.description,
    //       image: product.images[0],
    //       quantity: this.counter
    //     }

    //       this.productsInStore = [
    //         ...this.productsInStore,
    //         addProduct
    //       ];

    //     localStorage.setItem('products', JSON.stringify(this.productsInStore));

    //     this.store.dispatch(setProduct({product: this.productsInStore}));

    //     this.store.dispatch(getProduct());

    //   }
    // }

    private checkIfProductIsAlredyInStore(productId: number): boolean {
        return this.productsInStore.some(
            (product: { id: number }) => product.id === productId
        );
    }
}
