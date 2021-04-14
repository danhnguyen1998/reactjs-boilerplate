import { combineReducers } from 'redux';
import accountReduce from './accounts/redux/reducers';
import ageReducer from './age/redux/reducers';
import danceReducer from './dance/redux/reducers';
import danceTypeReducer from './danceTypes/redux/reducers';
import levelReducer from './level/redux/reducers';
import typesReducer from './types/redux/reducers';

export default combineReducers({
  danceType: danceTypeReducer,
  age: ageReducer,
  dance: danceReducer,
  types: typesReducer,
  level: levelReducer,
  account: accountReduce,
});
