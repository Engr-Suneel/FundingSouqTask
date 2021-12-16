import { createReducer, on } from "@ngrx/store";
import { loadUserListSuccess } from "../actions/users.actions";
import { initialUserState } from "../states/users.states";

export const UserReducers = createReducer(
  initialUserState,

  on(loadUserListSuccess, (state, action) => {
    return {
      ...state,
      users: action.response
    }
  })
)