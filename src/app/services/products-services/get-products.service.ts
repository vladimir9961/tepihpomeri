import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  
  private http = inject(HttpClient)

  constructor() { }

  public getProductsRugs(category: number, numberOfProducts: number): Observable<Product[]> {
    return this.http.get<Product[]>(`/wc/v3/products?category=${category.toString()}&per_page=${numberOfProducts}`);
  }

  public getSingleProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`/wc/v3/products/${productId.toString()}`);
  }

  public getRelatedProducts(productsIds: number[]): Observable<Product[]> {
    return this.http.get<any>(`/wc/v3/products?include=${productsIds}`);
  }
}
