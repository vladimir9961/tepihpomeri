import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTagsService {
  private http = inject(HttpClient)
  constructor() { }

  public getTags(parentCat: number): Observable<any> {
    return this.http.get<any>(`/wc/v3/products/categories?parent=${parentCat.toString()}`);
  }
}
