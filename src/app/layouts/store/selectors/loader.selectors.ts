import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoaderState } from "../states/loader.states";

export const APP_LOADER_STATE_NAME = "loaderState";

const getLoaderState = createFeatureSelector<LoaderState>(APP_LOADER_STATE_NAME);

export const getLoading = createSelector(getLoaderState, state => {
  return state.isLoading;
})