import { Injectable } from '@angular/core';
import { Order } from '../shared-models/order';
import { Observable, of } from 'rxjs';
import { Product } from '../shared-models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'api/Order';

  constructor(private httpClient: HttpClient) { }

  public getAll(year: number = null, month: number = null, day: number = null): Observable<Order[]> {
    var queryStrAry = [];
    if (year != null) {
      queryStrAry.push(`year=${year}`)
    }

    if (month != null) {
      queryStrAry.push(`month=${month}`)
    }

    if (day != null) {
      queryStrAry.push(`day=${day}`)
    }

    return this.httpClient.get<Order[]>(`${this.url}?${queryStrAry.join('&')}`);
  }

  public save(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.url, JSON.stringify(order));
  }

  public remove(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}
