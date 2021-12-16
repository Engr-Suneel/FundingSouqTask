import { createAction, props } from "@ngrx/store";
import { IError } from "src/app/core/interfaces/errors";

export const SHOW_ERROR = "[Error pages] show error data";
export const HIDE_ERROR = "[Error pages] hide error data";

export const showError = createAction(
  SHOW_ERROR,
  props<{ hasError: boolean, error: IError }>()
)

export const hideError = createAction(
  HIDE_ERROR,
  props<{ hasError: boolean, error: null }>()
)