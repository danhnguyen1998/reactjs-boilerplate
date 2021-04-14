import { combineReducers } from 'redux';
import categoriesReducers from 'screens/managers/categories/categoriesReducers';

export default combineReducers({
  categories: categoriesReducers,
});
