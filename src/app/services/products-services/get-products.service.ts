import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  
  private http = inject(HttpClient)

  constructor() { }

  public getProductsRugs(category: number, numberOfProducts: number): Observable<any> {
    return this.http.get<any>(`/wc/v3/products?category=${category.toString()}&per_page=${numberOfProducts}`);
  }

}
