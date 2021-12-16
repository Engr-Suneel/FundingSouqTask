import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ErrorState } from "../states/errors.states";

export const APP_ERROR_STATE_NAME = "errorsState";

const getErrorState = createFeatureSelector<ErrorState>(APP_ERROR_STATE_NAME);

export const getError = createSelector(getErrorState, state => {
  return state.hasError ? state.error : null;
})