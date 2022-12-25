import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { State } from '../state/app.state';

import { AuthService } from './auth.service';
import { getCurrentUser } from './state/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private store: Store<State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(getCurrentUser)
      .pipe(map(user => {
        console.log('user', user);
        if (!user) {
          this.authService.redirectUrl = state.url;
          window.location.href = environment.authUrl;
          return false;
        }
        else {
          return true;
        }
      }))
  }
}
