import { RouterState } from 'connected-react-router';
import { allReducers } from './configureStore';

type RouterType = {
  router: RouterState;
};

type GetReducerState<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer Q ? Q : never;
};

export type RootState = GetReducerState<typeof allReducers> & {
  router: RouterState;
};
