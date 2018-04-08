import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../pages/login/login';
import 'rxjs/add/operator/do';

@Injectable()
export class IsLogged implements HttpInterceptor {

  constructor(){

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> status:', evt.status);
        console.log('---> filter:', req.params.get('filter'));
      }
    }, error => {
       if (error.status == 402) {
         return {'Logged' : false};
       }
    });
  }
}