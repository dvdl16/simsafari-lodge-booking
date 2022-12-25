import { createAction, props } from "@ngrx/store";
import { User } from "../user";

export const setCurrentUser = createAction(
    '[Login Page] Set Current User',
    props<{ user: User | null }>()
)