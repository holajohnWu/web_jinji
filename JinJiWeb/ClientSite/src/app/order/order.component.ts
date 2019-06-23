import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared-services/product.service';
import { Product } from '../shared-models/product';
import { Order } from '../shared-models/order';
import { cloneDeep } from 'lodash';
import { OrderService } from '../shared-services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cDate = new Date();
  cOrderCount: number = 0;
  cOrder: Order = new Order(this.cDate);
  cProducts: Product[]; 
  cOrders$: Observable<Order[]>;

  constructor(public productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.initOrders();
  }

  initOrders() {
    this.cOrders$ = this.orderService.getAll(this.cDate.getFullYear(), this.cDate.getMonth() + 1, this.cDate.getDate());
  }

  insertProduct(p: Product) {
    this.cOrder.products.push(cloneDeep(p));
  }

  removeProduct(i: number) {
    this.cOrder.products.splice(i, 1);
  } 

  saveOrder() {
    this.orderService.save(this.cOrder)
      .subscribe(o => {
        this.initOrders();
        this.cOrder = new Order();
      });
  }

  removeOrder(i: number, o: Order) {
    this.orderService.remove(o);
  }

  onDateChange(date: string) {
    var dateAry = date.split('-');
    this.cDate = new Date(parseInt(dateAry[0]), parseInt(dateAry[1]), parseInt(dateAry[2]));
    // TODO: Refresh orders
    this.initOrders();
  }
}
