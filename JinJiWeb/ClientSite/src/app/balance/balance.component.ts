import { Component, OnInit } from '@angular/core';
import { Order } from '../shared-models/order';
import { OrderService } from '../shared-services/order.service';
import { ConsumableService } from '../shared-services/consumable.service';
import { OrderDetail } from '../shared-models/order-detail';
import { ConsumableType, Consumable } from '../shared-models/consumable';
import { DateService, Ymd } from '../shared-services/date.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import * as $ from 'jquery';

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

  @BlockUI() blockUI: NgBlockUI;

  monthOrders: Order[] = [];
  monthConsumables: Consumable[] = [];

  cDate = new Date();
  cOrderMap: Map<string, DaySummary>;
  dayList: Ymd[];
  oData: any;

  constructor(public orderService: OrderService,
    public consumableService: ConsumableService,
    private dateService: DateService) {
    this.dayList = dateService.getYmdList(this.cDate.getFullYear(), this.cDate.getMonth() + 1);
  }

  async ngOnInit() {
    this.blockUI.start();
    await this.initData(this.cDate.getFullYear(), this.cDate.getMonth() + 1);
    this.blockUI.stop();
  }

  private async initData(year: number, month: number) {
    this.monthOrders = await this.orderService.getAll(year, month).toPromise();
    if (!this.monthOrders) {
      this.monthOrders = [];
    }

    this.monthConsumables = await this.consumableService.getAll(year, month).toPromise();
    if (!this.monthConsumables) {
      this.monthConsumables = [];
    }

    this.cOrderMap = new Map(this.dayList.map((o, i, a): [string, DaySummary] =>
      [`${o.year}-${o.month}-${o.day}`,
      new DaySummary(o.year, o.month, o.day,
        this.monthOrders.filter(r => r.year == o.year && r.month == o.month && r.day == o.day)
          .map(o => o.orderDetails)
          .reduce((previous, current) => previous.concat(current), []),
        this.monthConsumables.filter(c => c.year == o.year && c.month == o.month && c.day == o.day))]));

    this.monthSummary();
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

  async monthSummary() {
    if (this.cOrderMap) {
      var oAry = Array.from(this.cOrderMap.values());
      this.oData = oAry.map(o => {
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
        this.oData.map(o => {
          return o.orderDetails.map(o => o.price).reduce((p, c) => p + c, 0) -
            o.consumablePerDayCosts.map(c => c.cost).reduce((p, c) => p + c, 0);
        })
          .reduce((p, c) => p + c, 0);

      var totalCost =
        this.oData.map(o => {
          return o.orderDetails.map(o => o.cost).reduce((p, c) => p + c, 0);
        })
          .reduce((p, c) => p + c, 0);

      var summary1 = `營業額：${(totalPrice | 0)}，盈餘：${(totalPrice | 0) - (totalCost | 0)}`;

      var oDetailsSummary = '';
      var orderDetails = this.monthOrders.map(o => o.orderDetails).reduce((p, c) => p.concat(c), []);
      var totalDetailMap = this.initOrderDetailMapByName(orderDetails);
      for (let key of Array.from(totalDetailMap.keys())) {
        oDetailsSummary += `<button type="button" class="btn btn-primary mr-1 mb-1">
        ${key} <span class="badge badge-light">${totalDetailMap.get(key).length}</span>
        </button>`;
      }

      var oConsuamblesSummary = '';
      var orderConsumables = this.monthConsumables.reduce((p, c) => p.concat(c), []);
      var totalConsumalbeMap = this.initOrderDetailMapByName(orderConsumables);
      for (let key of Array.from(totalConsumalbeMap.keys())) {
        oConsuamblesSummary += `<button type="button" class="btn btn-danger mr-1 mb-1">
        ${key} <span class="badge badge-light">${totalConsumalbeMap.get(key).length}</span>
        </button>`;
      }

      $('#month-summary-balance').append(`<h4>${summary1}</h4>`);
      $('#month-summary-details').append(oDetailsSummary);
      $('#month-summary-consumables').append(oConsuamblesSummary);
    }
  }

  private initOrderDetailMapByName(orderDetails: OrderDetail[]) {
    if (!orderDetails) {
      return new Map();
    }

    return new Map(orderDetails.map((v, i, a): [string, OrderDetail[]] => [
      v.name,
      a.filter(o => o.name == v.name)
    ]));
  }
}
