import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { SightingService } from "../sighting.service";
import { SightingApiActions, SightingPageActions } from "./actions";


@Injectable()
export class SightingEffects {

    constructor(private actions$: Actions,
        private sightingService: SightingService) { }

    loadSightings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SightingPageActions.loadSightings),
            mergeMap(() => this.sightingService.getSightings().pipe(
                map(sightings => SightingApiActions.loadSightingsSuccess({ sightings })),
                catchError(error => of(SightingApiActions.loadSightingsFailure({ error })))
            ))
        )
    })
}