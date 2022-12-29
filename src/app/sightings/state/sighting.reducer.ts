import { createReducer, on } from "@ngrx/store";
import { Sighting } from "../sighting.model";
import { SightingApiActions, SightingPageActions } from "./actions";

export interface SightingState {
    currentSightingId: number | null;
    sightings: Sighting[];
    error: string;
    isLoading: boolean;
}

const initialState: SightingState = {
    currentSightingId: null,
    sightings: [],
    error: '',
    isLoading: false,
}

// Reducer
export const sightingReducer = createReducer<SightingState>(
    initialState,
    on(SightingPageActions.setCurrentSighting, (state, action): SightingState => {
        return {
            ...state,
            currentSightingId: action.currentSightingId
        }
    }),
    on(SightingPageActions.clearCurrentSighting, (state): SightingState => {
        return {
            ...state,
            currentSightingId: null
        }
    }),
    on(SightingPageActions.loadSightings, (state): SightingState => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(SightingApiActions.loadSightingsSuccess, (state, action): SightingState => {
        return {
            ...state,
            sightings: action.sightings,
            error: '',
            isLoading: false
        }
    }),
    on(SightingApiActions.loadSightingsFailure, (state, action): SightingState => {
        return {
            ...state,
            sightings: [],
            error: action.error,
            isLoading: false
        }
    }),
)