import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Sighting } from '../sighting.model';
import { SightingState } from './sighting.reducer';


export interface State extends AppState.State {
    bookings: SightingState;
}

// Selectors
const getSightingsFeatureState = createFeatureSelector<SightingState>('sightings');

export const getCurrentSightingId = createSelector(
    getSightingsFeatureState,
    state => state.currentSightingId
)

export const getCurrentSighting = createSelector(
    getSightingsFeatureState,
    getCurrentSightingId,
    (state, currentSightingId) => {
        return currentSightingId ? state.sightings.find(p => p.id === currentSightingId) : null;
    }
)

export const getSightings = createSelector(
    getSightingsFeatureState,
    state => state.sightings
)

export const isSightingsLoading = createSelector(
    getSightingsFeatureState,
    state => state.isLoading
)

export const getError = createSelector(
    getSightingsFeatureState,
    state => state.error
)
