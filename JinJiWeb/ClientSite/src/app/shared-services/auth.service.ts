import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public returnUrl: string;
  private url = "/api/Account"

  constructor(private httpClient: HttpClient,
    public router: Router) {
  }

  public login(account: string, password: string): Observable<string> {
    return this.httpClient.post<string>(this.url + "/Login", JSON.stringify({ account: account, password: password }))
      .pipe(
        map((res: string) => {
          localStorage.setItem('Authorization', res);
          return res;
        }),
        catchError(res => throwError(res))
      );
  }

  public logout(): Observable<any> {
    localStorage.clear();
    return of(true);
  }

  public isLoggedIn(): boolean {
    var token = localStorage.getItem('Authorization');
    if (!!token) {
      return true;
    }

    return false;
  }
}
