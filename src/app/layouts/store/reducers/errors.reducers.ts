import { createReducer, on } from "@ngrx/store";
import { hideError, showError } from "../actions/errors.actions";
import { initialErrorState } from "../states/errors.states";

export const ErrorReducer = createReducer(
  initialErrorState,
  on(showError, (state, action) => {
    return {
      ...state,
      hasError: action.hasError,
      error: action.error
    }
  }),
  on(hideError, (state, action) => {
    return {
      ...state,
      hasError: action.hasError,
      error: action.error
    }
  })
)