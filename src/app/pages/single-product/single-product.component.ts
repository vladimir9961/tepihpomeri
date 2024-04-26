import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
// Model
import { Product } from '../../model/products.model';

// Service
import { GetProductsService } from '../../services/products-services/get-products.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    
    ],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
})
export class SingleProductComponent {
  private destroy$ = new Subject<void>();
  
  public product: any;
  public similarProducts: Product[] = [];



  constructor(
    private route: ActivatedRoute, 
    private getProductService: GetProductsService
  ) { }

  ngOnInit(): void {
    this.getProduct()
  } 
  
  private getProduct(): void {
    this.route.params.subscribe((params: any) => {
      this.getProductService.getSingleProduct(params.id)
       .pipe(
        takeUntil(this.destroy$)
        )

        .subscribe(product => {
          this.product = product
          console.log(product)
          this.getRelatedProducts(product.related_ids)
        })
    });
  }

  private getRelatedProducts(related_ids: number[]): void {
    this.getProductService.getRelatedProducts(related_ids)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(products => {
      this.similarProducts = products
      console.log(products)
    })
  }

  
}
