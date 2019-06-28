import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    var token = localStorage.getItem('Authorization');

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'charset': 'utf8',
        'Authorization': `Bearer ${token}`
      }
    });

    return next.handle(req);
  }
}