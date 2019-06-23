import { Injectable } from '@angular/core';
import { Order } from '../shared-models/order';
import { Observable, of } from 'rxjs';
import { Product } from '../shared-models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [
    { year: 2019, month: 6, day: 1, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 2, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 3, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 4, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 5, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 6, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order,
    { year: 2019, month: 6, day: 7, products: [
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product,
      { name: "Test", price: 100, cost: 10 } as Product
    ]} as Order
  ];

  constructor() { }

  public getAll(year: number = 0, month: number = 0, day: number = 0): Observable<Order[]> {
    return of(this.orders.filter(o =>
      (year == 0 || o.year == year)
      && (month == 0 || o.month == month)
      && (day == 0 || o.day == day)));
  }

  public save(order: Order): Observable<Order> {
    if (!order.id) {
      order.id = Math.floor(Math.random() * 100000000);
      this.orders.push(order);
    } else {
      var index = this.orders.findIndex(p => p.id == order.id);
      this.orders.splice(index, 1, order);
    }

    return of(order);
  }

  public remove(order: Order): Observable<boolean> {
    let index = this.orders.findIndex(o => o.id == order.id);

    if(index > -1) {
      this.orders.splice(index, 1);
      return of(true);
    }

    return of(false);
  }
}
