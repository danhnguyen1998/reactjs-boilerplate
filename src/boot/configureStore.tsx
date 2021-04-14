import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, CombinedState, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger, LogEntryObject } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import screenReducers from 'screens/screenReducers';
import screenSaga from 'screens/screenSaga';

export const allReducers = {
  screen: screenReducers,
};

class ConfigureStore {
  public history: History = createBrowserHistory();

  public setup = () => {
    /** add middlewares */
    const middlewares: any = [];
    middlewares.push(routerMiddleware(this.history));
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);
    if (process.env.NODE_ENV === 'development') {
      const logger = createLogger({
        diff: true,
        collapsed: (_getState: any, _action: any, logEntry: LogEntryObject | undefined) => !logEntry?.error,
      });
      middlewares.push(logger);
    }
    const appMiddleware = composeWithDevTools(applyMiddleware(...middlewares));

    /** config root reducer */
    const allCombineReducers = combineReducers({
      ...allReducers,
      router: connectRouter(this.history),
    });
    const resettableAppReducer = (state: CombinedState<any>, action: any) => allCombineReducers(state, action);

    /** config redux-persist */
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: [''],
      blacklist: ['router'],
    };
    const persistedReducer = persistReducer(persistConfig, resettableAppReducer);

    /** config root saga */
    const saga = function* rootSaga() {
      yield all([...Object.values(screenSaga)].map(fork));
    };

    /** create redux store */
    const store = createStore(persistedReducer, appMiddleware);
    const persistor = persistStore(store);
    sagaMiddleware.run(saga);
    return { store, persistor };
  };
}

export default new ConfigureStore();
