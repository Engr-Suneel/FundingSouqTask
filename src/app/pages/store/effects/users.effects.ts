import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { exhaustMap, map, catchError } from "rxjs/operators";
import { EventService } from "src/app/core/services/event.service";
import { UserService } from "src/app/core/services/users.service";
import { AppConst } from "src/app/helpers/app-constants";
import { setLoader } from "src/app/layouts/store/actions/loader.actions";
import { AppState } from "src/app/store";
import { addNewUser, deleteUserById, editUserById, loadUserList, loadUserListSuccess } from "../actions/users.actions";

@Injectable()
export class UserEffects {
  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<AppState>,
    private eventService: EventService,
  ) { }

  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserList),
      exhaustMap((action) =>
        this.userService.users.all().pipe(
          map((data) => {
            if (data && data.length) {
              this.eventService.broadcast(AppConst.EVENT_USER_LOADED_SUCCESS);
            }
            this.store.dispatch(setLoader({ isLoading: false }));
            return loadUserListSuccess({ response: data });
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    )
  );

  addNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewUser),
      exhaustMap((action) =>
        this.userService.users.create(action.payload).pipe(
          map((data: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            this.eventService.broadcast(AppConst.EVENT_USER_ADDED_SUCCESS, data);
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    ), { dispatch: false }
  );

  editUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserById),
      exhaustMap((action) =>
        this.userService.users.update(action.payload, action.id).pipe(
          map((data: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            this.eventService.broadcast(AppConst.EVENT_USER_EDITED_SUCCESS, data);
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    ), { dispatch: false }
  );

  deleteUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserById),
      exhaustMap((action) =>
        this.userService.users.delete(action.id).pipe(
          map((data: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            this.eventService.broadcast(AppConst.EVENT_USER_DELETE_SUCCESS, data);
          }),
          catchError((error: any) => {
            this.store.dispatch(setLoader({ isLoading: false }));
            return of(error)
          })
        )
      )
    ), { dispatch: false }
  );
}