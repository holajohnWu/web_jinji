import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared-services/product.service';
import { Product } from '../shared-models/product';
import { Order } from '../shared-models/order';
import { cloneDeep } from 'lodash';
import { OrderService } from '../shared-services/order.service';
import { Observable } from 'rxjs';
import { OrderDetail } from '../shared-models/order-detail';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;

  cDate = new Date();
  cOrderCount: number = 0;
  cOrder: Order = new Order(this.cDate);
  cProducts: Product[];
  cOrders$: Observable<Order[]>;

  constructor(public productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.products$ = this.productService.getAll();
    this.initOrders();
  }

  initOrders() {
    this.cOrders$ = this.orderService.getAll(this.cDate.getFullYear(), this.cDate.getMonth() + 1, this.cDate.getDate());
  }

  insertProduct(p: Product) {
    var model = cloneDeep(p) as OrderDetail;
    delete model['id'];

    this.cOrder.orderDetails.push(model);
  }

  removeProduct(i: number) {
    this.cOrder.orderDetails.splice(i, 1);
  }

  saveOrder() {
    this.orderService.save(this.cOrder)
      .subscribe(o => {
        this.initOrders();
        this.cOrder = new Order();
      });
  }

  removeOrder(id: number) {
    this.orderService.remove(id)
      .subscribe(o => {
        this.initOrders();
      });
  }

  onDateChange(date: string) {
    var dateAry = date.split('-');
    this.cDate = new Date(parseInt(dateAry[0]), parseInt(dateAry[1]) - 1, parseInt(dateAry[2]));
    this.initOrders();
  }

  totalPrice(o: Order) {
    return o.orderDetails.map(p => p.price).reduce((p, r) => p + r, 0);
  }
}
