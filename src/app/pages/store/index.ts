import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { AppConst } from "src/app/helpers/app-constants";
import { UserEffects } from "./effects/users.effects";
import { UserReducers } from "./reducers/users.reducers";
import { UserState } from "./states/users.states";

export const getPagesState = createFeatureSelector<MainState>(AppConst.PAGES_FEATURE_SELECTOR);

export interface MainState {
  userState: UserState
}

export const pagesReducers: ActionReducerMap<MainState> = {
  userState: UserReducers
}

export const PagesEffects: any[] = [
  UserEffects
];