import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared-services/product.service';
import { Product } from '../shared-models/product';
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products = this.productService.getAll();

  public cProduct = new Product();

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

  save() {
    this.productService.save(this.cProduct);
    this.cProduct = new Product();
  }

  newProduct() {
    this.cProduct = new Product();
  }

  showDetail(product: Product) {
    this.cProduct = cloneDeep(product);
  }
}
