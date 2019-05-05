import types from './actionTypes';
import { getInitialSearchData } from '../../../core/useCase/searchProduct/searchProduct.ts';

export const initialState = getInitialSearchData();

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.setData:
      return action.data;
    default:
      return state;
  }
}
