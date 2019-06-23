import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared-models/order';
import { OrderService } from '../shared-services/order.service';



@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  cDate = new Date();
  cOrderMap: Map<string, Order[]>;
  cOrderMapKey: string[];

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.initOrders();
  }

  private initOrders() {
    this.orderService.getAll(this.cDate.getFullYear(), this.cDate.getMonth() + 1)
      .subscribe(result => {
        if(!result) {
          result = [];
        }

        this.cOrderMap = new Map(result.map((o): [string, Order[]] => 
          [`${o.year}-${o.month}-${o.day}`, result.filter(r => r.year == o.year && r.month == o.month && r.day == o.day)]));
      
        this.cOrderMapKey = Array.from(this.cOrderMap.keys());
      });
  }

  public totalPrice(o: Order) {
    return o.products.map(p => p.price).reduce((p, r) => p + r, 0);
}
}
