import { Component, OnInit } from '@angular/core';
import { ConsumableService } from '../shared-services/consumable.service';
import { Consumable } from '../shared-models/consumable';
import { DateService, Ymd } from '../shared-services/date.service';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consumable',
  templateUrl: './consumable.component.html',
  styleUrls: ['./consumable.component.scss']
})
export class ConsumableComponent implements OnInit {

  public consumables$: Observable<Consumable[]>;
  public cConsumable = new Consumable(new Date());
  public currentMonth: Ymd;
  public ymList: Ymd[];

  constructor(public consumableService: ConsumableService,
    public dateService: DateService) {
  }

  ngOnInit() {
    this.dateService.getYmList()
      .subscribe(r => {
        if (r && r.length > 0) {
          this.ymList = r;
          this.currentMonth = this.ymList[0];
          this.loadConsumable();
        }
      });
  }

  save() {
    var dateAry = this.cConsumable.date.split('-');
    this.cConsumable.year = parseInt(dateAry[0]);
    this.cConsumable.month = parseInt(dateAry[1]);
    this.cConsumable.day = parseInt(dateAry[2]);

    this.consumableService.save(this.cConsumable)
      .subscribe(r => {
        this.loadConsumable();
        this.cConsumable = new Consumable(new Date());
      });
  }

  delete(id: number) {
    this.consumableService.delete(id)
      .subscribe(r => {
        this.loadConsumable();
        this.cConsumable = new Consumable(new Date());
      });
  }

  newConsumable() {
    this.cConsumable = new Consumable(new Date());
  }

  showDetail(consumable: Consumable) {
    this.cConsumable = cloneDeep(consumable);
    this.cConsumable.date = `${this.cConsumable.year}-${this.cConsumable.month}-${this.cConsumable.day}`;
  }

  loadConsumable() {
    this.consumables$ = this.consumableService.getAll(this.currentMonth.year, this.currentMonth.month);
  }
}