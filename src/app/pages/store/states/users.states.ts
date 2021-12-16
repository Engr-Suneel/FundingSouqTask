import { IUser } from "src/app/core/interfaces/user";

export interface UserState {
  users: Array<IUser>;
}

export const initialUserState: UserState = {
  users: []
}