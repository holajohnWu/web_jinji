import { Injectable } from '@angular/core';
import { Consumable, ConsumableType } from '../shared-models/consumable';
import { Observable, of } from 'rxjs';
import { NameValuePair } from '../shared-models/name-value-pair';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {

  consumables: Consumable[] = [];

  constructor() { }

  getAll(year: number = 0, month: number = 0, day: number = 0): Observable<Consumable[]> {
    return of(this.consumables.filter(c =>
      (year == 0 || c.year == year)
      && (month == 0 || c.month == month)
      && (day == 0 || c.day == day)
    ));
  }

  save(consumable: Consumable): Observable<Consumable> {
    consumable.year = consumable.date.getFullYear();
    consumable.month = consumable.date.getMonth() + 1;
    consumable.day = consumable.date.getDate();

    if (!consumable.id) {
      consumable.id = Math.floor(Math.random() * 100000000);
      this.consumables.push(consumable);
    } else {
      var index = this.consumables.findIndex(p => p.id == consumable.id);
      this.consumables.splice(index, 1, consumable);
    }

    return of(consumable);
  }

  getConsumableTypes(): Observable<NameValuePair[]> {

    let enumValues: Array<NameValuePair> = [];

    for (let value in ConsumableType) {
      if (typeof ConsumableType[value] !== 'number') {
        enumValues.push({ name: ConsumableType[value], value: value } as NameValuePair);
      }
    }

    return of(enumValues);
  }
}
