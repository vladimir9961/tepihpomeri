import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  
  private http = inject(HttpClient)
  constructor() { }

  public getProducts(): Observable<any> {
    return this.http.get<any>('/wc/v3/products?category=17&per_page=25');
  }
}
