import types from './actionTypes';
import { getInitialDetailData } from '../../../core/useCase/productDetail/productDetail.ts';

export const initialState = getInitialDetailData();

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.setData_pd:
      return action.data;
    default:
      return state;
  }
}
