import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { State } from "../app.state";
import * as HydrationActions from "./hydration.actions";

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate),
      map(() => {
        const storageValue = localStorage.getItem("state");
        if (storageValue) {
          try {
            let state = JSON.parse(storageValue);
            state.currentUser = this.validToken(state) ? state.currentUser : null;
            return HydrationActions.hydrateSuccess({ state });
          } catch {
            localStorage.removeItem("state");
          }
        }
        return HydrationActions.hydrateFailure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(HydrationActions.hydrateSuccess, HydrationActions.hydrateFailure),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => {
          // Don't store bookings in local storage
          const stateToStore = {
            'user': state.user
          }
          localStorage.setItem("state", JSON.stringify(stateToStore))
        })
      ),
    { dispatch: false }
  );

  private validToken(state: State) {
    if (state.user.currentUser?.token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(state.user.currentUser?.token);
      const isExpired = jwtHelper.isTokenExpired(state.user.currentUser?.token);
      if (decodedToken && !isExpired){
        return true;
      }
    }
    return false;
  }

  constructor(private action$: Actions, private store: Store<State>) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}

