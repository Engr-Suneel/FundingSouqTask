import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { IError } from "src/app/core/interfaces/errors";
import { AppState } from "src/app/store";
import { hideError, showError } from "../actions/errors.actions";

@Injectable()
export class ErrorEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {

  }

  errorHandling$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(showError),
        map((error) => {
          this.showError(error.error);
        })
      )
    },
    { dispatch: false }
  );

  showError(error: IError) {

  }

}