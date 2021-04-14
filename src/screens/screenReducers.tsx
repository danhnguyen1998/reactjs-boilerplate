import { combineReducers } from 'redux';
import managerReducers from 'screens/managers/managerReducers';

export default combineReducers({
  manager: managerReducers,
});
