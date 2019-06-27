import { Injectable } from '@angular/core';
import { Product } from '../shared-models/product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'api/product'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  save(product: Product): Observable<Product> {
    if (product.id) {
      return this.httpClient.put<Product>(`${this.url}/${product.id}`, JSON.stringify(product));
    } else {
      return this.httpClient.post<Product>(`${this.url}`, JSON.stringify(product));
    }
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}
