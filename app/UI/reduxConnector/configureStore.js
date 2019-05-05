import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducer';
import config from '../../config';

// Returns the store instance
// It can also take initialState argument when provided
const configureStore = () => {
  if (config.logEnabled) {
    return {
      ...createStore(reducers, applyMiddleware(thunk, logger))
    };
  } else {
    return {
      ...createStore(reducers, applyMiddleware(thunk))
    };
  }
};

const store = configureStore();

export default store;
