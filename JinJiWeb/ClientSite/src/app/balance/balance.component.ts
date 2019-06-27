import { Component, OnInit } from '@angular/core';
import { Order } from '../shared-models/order';
import { OrderService } from '../shared-services/order.service';
import { ConsumableService } from '../shared-services/consumable.service';
import { OrderDetail } from '../shared-models/order-detail';
import { ConsumableType, Consumable } from '../shared-models/consumable';
import { DateService, Ymd } from '../shared-services/date.service';

class DaySummary {
  year: number;
  month: number;
  day: number;
  orderDetails: Map<string, OrderDetail[]>;
  consumableCosts: Map<string, Consumable[]>;
  consumablePerDays: Map<string, Consumable[]>;

  constructor(year: number, month: number, day: number, orderDetails: OrderDetail[], consumables: Consumable[]) {
    this.year = year;
    this.month = month;
    this.day = day;

    this.orderDetails = new Map(orderDetails
      .map((v, i, a): [string, OrderDetail[]] => [v.name, a.filter(o => o.name == v.name)]));

    this.consumableCosts = new Map(consumables
      .filter(c => c.type != ConsumableType.每日支出)
      .map((v, i, a): [string, Consumable[]] => [v.name, a.filter(o => o.name == v.name)]));

    this.consumablePerDays = new Map(consumables.filter(c => c.type == ConsumableType.每日支出)
      .map((v, i, a): [string, Consumable[]] => [v.name, a.filter(o => o.name == v.name)]));
  }

  get orderDetailsKeys(): string[] {
    return Array.from(this.orderDetails ? this.orderDetails.keys() : []);
  }

  get consumableCostKeys(): string[] {
    return Array.from(this.consumableCosts ? this.consumableCosts.keys() : []);
  }

  get consumablePerDayKeys(): string[] {
    return Array.from(this.consumablePerDays ? this.consumablePerDays.keys() : []);
  }

  get dayBalance(): string {
    var totalPrice = Array.from(this.orderDetails.values()).reduce((p, c) => p.concat(c), []).map(o => o.price).reduce((p, c) => p + c, 0);
    var totalConsumablePerDay = Array.from(this.consumablePerDays.values()).reduce((p, c) => p.concat(c), []).map(o => o.cost).reduce((p, c) => p + c, 0);

    return `營業額：${totalPrice - totalConsumablePerDay}`;
  }
}

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  cDate = new Date();
  cOrderMap: Map<string, DaySummary>;
  dayList: Ymd[];

  constructor(public orderService: OrderService,
    public consumableService: ConsumableService,
    private dateService: DateService) {
    this.dayList = dateService.getYmdList(this.cDate.getFullYear(), this.cDate.getMonth() + 1);
  }

  async ngOnInit() {
    await this.initData(this.cDate.getFullYear(), this.cDate.getMonth() + 1);
  }

  private async initData(year: number, month: number) {
    var orders = await this.orderService.getAll(year, month).toPromise();
    if (!orders) {
      orders = [];
    }

    var consumables = await this.consumableService.getAll(year, month).toPromise();
    if (!consumables) {
      consumables = [];
    }

    this.cOrderMap = new Map(this.dayList.map((o, i, a): [string, DaySummary] =>
      [`${o.year}-${o.month}-${o.day}`,
      new DaySummary(o.year, o.month, o.day,
        orders.filter(r => r.year == o.year && r.month == o.month && r.day == o.day)
          .map(o => o.orderDetails)
          .reduce((previous, current) => previous.concat(current), []),
        consumables.filter(c => c.year == o.year && c.month == o.month && c.day == o.day))]));
  }

  public onMonthChange(date: string) {
    var dAry = date.split('-');
    var year = parseInt(dAry[0]);
    var month = parseInt(dAry[1]);
    this.initData(year, month);
    this.dayList = this.dateService.getYmdList(year, month);
  }

  public totalPrice(o: Order) {
    return o.orderDetails.map(p => p.price).reduce((p, r) => p + r, 0);
  }

  get monthSummary() {
    if (this.cOrderMap) {
      var oAry = Array.from(this.cOrderMap.values());
      var oData = oAry.map(o => {
        return {
          orderDetails: Array.from(o.orderDetails.values())
            .reduce((p, c) => p.concat(c), []),
          consumableCosts: Array.from(o.consumableCosts.values())
            .reduce((p, c) => p.concat(c), []),
          consumablePerDayCosts: Array.from(o.consumablePerDays.values())
            .reduce((p, c) => p.concat(c), [])
        }
      })

      var totalPrice =
        oData.map(o => {
          return o.orderDetails.map(o => o.price).reduce((p, c) => p + c, 0) -
            o.consumablePerDayCosts.map(c => c.cost).reduce((p, c) => p + c, 0);
        })
          .reduce((p, c) => p + c, 0);

      var totalCost =
        oData.map(o => {
          return o.orderDetails.map(o => o.cost).reduce((p, c) => p + c, 0);
        })
          .reduce((p, c) => p + c, 0);

          console.log(totalCost);
    }

    return `營業額：${(totalPrice | 0)}，盈餘：${(totalPrice | 0) - (totalCost | 0)}`;
  }
}
