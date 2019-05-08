import { combineReducers } from 'redux';

import searchProduct from './searchProduct/reducer';
import productDetail from './productDetail/reducer';

// Combines all reducers to a single reducer function
const reducers = combineReducers({
  searchProduct,
  productDetail
});

export default reducers;
