import { createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { getPagesState } from "..";

export const getUserList = createSelector(getPagesState, (state) => {
  return state.userState.users;
});

export const getUserById = createSelector(
  getUserList,
  getCurrentRoute,
  (users, route: RouterStateUrl) => {
    return users ? users.find(o => o.id == route.params['id']) : null;
  }
);