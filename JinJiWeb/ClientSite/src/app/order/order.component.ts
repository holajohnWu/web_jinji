import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared-services/product.service';
import { Product } from '../shared-models/product';
import { Order } from '../shared-models/order';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cDate = new Date();
  cOrderCount: number = 0;
  cOrder: Order = new Order();
  cProducts: Product[];
  cOrders: Order[] = [];

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

  insertProduct(p: Product) {
    this.cOrder.products.push(cloneDeep(p));
  }

  removeProduct(i: number) {
    this.cOrder.products.splice(i, 1);
  } 

  saveOrder() {
    this.cOrders.push(this.cOrder);
    this.cOrder = new Order();
  }

  removeOrder(i: number, o: Order) {
    this.cOrders.splice(i, 1);
  }

  onDateChange(date: Date) {
    this.cDate = date;

    // TODO: Refresh orders
  }
}
