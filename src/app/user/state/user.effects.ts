import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { tap } from "rxjs"
import * as UserActions from '../state/user.actions'

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions) { }

    setCurrentUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.setCurrentUser),
            tap(action =>
                localStorage.setItem('currentUser', JSON.stringify(action.user))
              )
        )
    })
}

