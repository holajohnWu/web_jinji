import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared-services/product.service';
import { Product } from '../shared-models/product';
import { cloneDeep } from "lodash";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products$: Observable<Product[]>;

  public cProduct = new Product();

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.products$ = this.productService.getAll();
  }

  save() {
    this.productService.save(this.cProduct)
      .subscribe(r => {
        this.cProduct = new Product();
        this.getAll();
      });
  }

  newProduct() {
    this.cProduct = new Product();
  }

  showDetail(product: Product) {
    this.cProduct = cloneDeep(product);
  }

  delete(id: number) {
    this.productService.delete(id)
      .subscribe(r => {
        this.getAll();
        this.cProduct = new Product();
      });
  }
}
