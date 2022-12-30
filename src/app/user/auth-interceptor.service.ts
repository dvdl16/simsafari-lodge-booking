import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { State } from '../state/app.state';
import { Store } from '@ngrx/store';
import { getCurrentUser } from './state/user.reducer';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let hostRequiringAuth;
    try {
      hostRequiringAuth = new URL(environment.apiUrl);
    } catch (_) {
      hostRequiringAuth = {hostname: ''}
    }
    const hostRequest = new URL(req.url);
    if (hostRequest.hostname === hostRequiringAuth.hostname) {
      return this.store.select(getCurrentUser).pipe(
        take(1),
        exhaustMap(user => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`,
              'Access-Control-Allow-Origin':'*',
            }
          });
          return next.handle(modifiedReq);
        })
        );
      }
      else {
        return next.handle(req);
      }
  }
}
