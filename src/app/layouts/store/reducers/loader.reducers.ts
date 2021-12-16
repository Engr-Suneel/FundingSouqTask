import { createReducer, on } from "@ngrx/store";
import { setLoader } from "../actions/loader.actions";
import { initialLoaderState } from "../states/loader.states";

export const LoaderReducer = createReducer(
  initialLoaderState,
  on(setLoader, (state, action) => {
    return {
      ...state,
      isLoading: action.isLoading
    }
  })
)