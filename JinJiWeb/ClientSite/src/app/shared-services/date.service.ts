import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';

export class Ymd {
  year: number;
  month: number;
  day: number;
}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private firstMonth = new Date(2019, 3);
  private monthList: Ymd[] = [];

  constructor() {
    var date = new Date();

    while (this.firstMonth.getTime() <= date.getTime()) {
      this.monthList.push({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
      date.setMonth(date.getMonth() - 1);
    }
  }

  getYmList(): Observable<Ymd[]> {
    return of(this.monthList);
  }
}
