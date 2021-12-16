import { createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { getPagesState } from "..";

export const getUserList = createSelector(getPagesState, (state) => {
  return state.userState.users;
});

export const getUserListWithRoute = createSelector(
  getUserList,
  getCurrentRoute,
  (users, route: RouterStateUrl) => {
    return {
      users,
      route
    }
  }
);