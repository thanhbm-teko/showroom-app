import { combineReducers } from 'redux';

import searchProduct from './searchProduct/reducer';

// Combines all reducers to a single reducer function
const reducers = combineReducers({
  searchProduct
});

export default reducers;
