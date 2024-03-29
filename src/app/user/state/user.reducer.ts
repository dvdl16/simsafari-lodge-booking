import { on, createReducer, createFeatureSelector, createSelector } from "@ngrx/store";

import * as UserActions from '../state/user.actions'
import { User } from "../user";

export interface UserState {
    maskUsername: boolean;
    currentUser: User | null;
}

const initialState: UserState = {
    maskUsername: false,
    currentUser: null
}

// Selectors
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.setCurrentUser, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user
        }
    }),

)