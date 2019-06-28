import { Injectable } from '@angular/core';
import { Consumable, ConsumableType } from '../shared-models/consumable';
import { Observable, of } from 'rxjs';
import { NameValuePair } from '../shared-models/name-value-pair';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {

  url = 'api/Consumable';

  constructor(private httpClient: HttpClient) { }

  getAll(year: number = null, month: number = null, day: number = null): Observable<Consumable[]> {
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

    return this.httpClient.get<Consumable[]>(`${this.url}?${queryStrAry.join('&')}`);
  }

  save(consumable: Consumable): Observable<Consumable> {
    return this.httpClient.post<Consumable>(this.url, JSON.stringify(consumable));
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

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}
