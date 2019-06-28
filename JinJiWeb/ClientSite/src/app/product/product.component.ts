import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared-services/product.service';
import { Product } from '../shared-models/product';
import { cloneDeep } from "lodash";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  public products$: Observable<Product[]>;

  public cProduct = new Product();

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.blockUI.start();
    this.products$ = this.productService.getAll();
    this.blockUI.stop();
  }

  save() {
    this.blockUI.start();
    this.productService.save(this.cProduct)
      .pipe(finalize(() => this.blockUI.stop()))
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
    this.blockUI.start();
    this.productService.delete(id)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(r => {
        this.getAll();
        this.cProduct = new Product();
      });
  }
}
