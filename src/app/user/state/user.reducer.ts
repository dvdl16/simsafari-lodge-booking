import { createAction, on, createReducer, createFeatureSelector, createSelector } from "@ngrx/store";

import * as UserActions from '../state/user.actions'

export interface UserState {
    maskUsername: boolean;
}

const initialState: UserState = {
    maskUsername: false
}

// Selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUsername = createSelector(
    getUserFeatureState,
    state => state.maskUsername
)

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.maskUserName, (state): UserState => {
        return {
            ...state,
            maskUsername: !state.maskUsername
        };
    })

)