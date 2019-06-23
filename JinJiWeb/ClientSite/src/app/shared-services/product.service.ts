import { Injectable } from '@angular/core';
import { Product } from '../shared-models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    {name: "測試1", price: 100, cost: 10} as Product,
    {name: "測試2", price: 200, cost: 10} as Product,
    {name: "測試3", price: 300, cost: 10} as Product,
    {name: "測試4", price: 400, cost: 10} as Product,
    {name: "測試5", price: 500, cost: 10} as Product,
    {name: "測試6", price: 600, cost: 10} as Product,
    {name: "測試7", price: 700, cost: 10} as Product,
    {name: "測試8", price: 800, cost: 10} as Product,
    {name: "測試9", price: 900, cost: 10} as Product,
    {name: "測試10", price: 1000, cost: 10} as Product,
    {name: "測試11", price: 1100, cost: 10} as Product
  ];

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
