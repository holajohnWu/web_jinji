import { Injectable } from '@angular/core';
import { Product } from '../shared-models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];

  constructor() { }

  getAll(): Observable<Product[]> {
    return of(this.products);
  }

  save(product: Product): Observable<Product> {
    if (!product.id) {
      product.id = Math.floor(Math.random() * 100000000);
      this.products.push(product);
    } else {
      var index = this.products.findIndex(p => p.id == product.id);
      this.products.splice(index, 1, product);
    }

    return of(product);
  }
}
