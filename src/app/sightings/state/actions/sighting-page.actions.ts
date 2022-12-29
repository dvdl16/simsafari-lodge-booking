import { createAction, props } from "@ngrx/store";
import { Sighting } from "../../sighting.model";

export const setCurrentSighting = createAction(
    '[Sightings Page] Set Current Sighting',
    props<{ currentSightingId: number }>()
)

export const clearCurrentSighting = createAction(
    '[Sightings Page] Clear Current Sighting'
)

export const initialiseCurrentSighting = createAction(
    '[Sightings Page] Initialise Current Sighting'
)

export const loadSightings = createAction(
    '[Sightings Page] Load'
)
