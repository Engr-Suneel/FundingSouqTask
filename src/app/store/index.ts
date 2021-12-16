import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ErrorReducer } from '../layouts/store/reducers/errors.reducers';
import { LoaderReducer } from '../layouts/store/reducers/loader.reducers';
import { APP_ERROR_STATE_NAME } from '../layouts/store/selectors/errors.selectors';
import { APP_LOADER_STATE_NAME } from '../layouts/store/selectors/loader.selectors';
import { ErrorState } from '../layouts/store/states/errors.states';
import { LoaderState } from '../layouts/store/states/loader.states';


export interface AppState {
  [APP_LOADER_STATE_NAME]: LoaderState,
  [APP_ERROR_STATE_NAME]: ErrorState,
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  [APP_LOADER_STATE_NAME]: LoaderReducer,
  [APP_ERROR_STATE_NAME]: ErrorReducer,
  router: routerReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
