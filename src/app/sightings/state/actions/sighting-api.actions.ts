import { createAction, props } from "@ngrx/store"
import { Sighting } from "../../sighting.model"

export const loadSightingsSuccess = createAction(
    '[Sightings API] Load Success',
    props<{ sightings: Sighting[]}>()
)

export const loadSightingsFailure = createAction(
    '[Sightings API] Load Failure',
    props<{ error: string }>()
)
