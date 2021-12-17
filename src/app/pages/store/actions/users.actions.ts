import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/core/interfaces/user";

export enum UserActionTypeEnum {
  LOAD_USER_LIST = '[users page] load list of users',
  LOAD_USER_LIST_SUCCESS = '[users page] load list of users success',

  ADD_NEW_USER = '[create users page] add new user',
  EDIT_USER_BY_ID = '[create users page] edit user by id',
  DELETE_USER_BY_ID = '[users page] delete user by id',
}


export const loadUserList = createAction(UserActionTypeEnum.LOAD_USER_LIST);
export const loadUserListSuccess = createAction(UserActionTypeEnum.LOAD_USER_LIST_SUCCESS, props<{ response: IUser[] }>());


export const addNewUser = createAction(
  UserActionTypeEnum.ADD_NEW_USER,
  props<{ payload: IUser }>()
);

export const editUserById = createAction(
  UserActionTypeEnum.EDIT_USER_BY_ID,
  props<{ payload: IUser, id: number }>()
)

export const deleteUserById = createAction(
  UserActionTypeEnum.DELETE_USER_BY_ID,
  props<{ id: number }>()
)