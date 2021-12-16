import { createAction, props } from "@ngrx/store";

export const UPDATE_LOADER = "[loader pages] update loader value";

export const setLoader = createAction(
  UPDATE_LOADER,
  props<{ isLoading: boolean }>()
)