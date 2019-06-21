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
  public cConsumable = new Consumable();
  public currentMonth: Ymd;

  constructor(public consumableService: ConsumableService,
    public dateService: DateService) {
  }

  ngOnInit() {
  }

  save() {
    this.consumableService.save(this.cConsumable);
    this.cConsumable = new Consumable();
  }

  newConsumable() {
    this.cConsumable = new Consumable();
  }

  showDetail(consumable: Consumable) {
    this.cConsumable = cloneDeep(consumable);
  }

  loadConsumable() {
    this.consumables$ = this.consumableService.getAll(this.currentMonth.year, this.currentMonth.month);
  }
}