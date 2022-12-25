import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { userReducer, UserState } from "../user/state/user.reducer";
import { hydrationMetaReducer } from "./hydration/hydration.reducer";

export interface State {
    user: UserState;
}

export const reducers: ActionReducerMap<State> = {
    user: userReducer
  }

export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer
  ]