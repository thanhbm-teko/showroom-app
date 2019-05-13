import types from './actionTypes';
import { getInitialSearchData } from '../../core/useCase/searchProduct/searchProduct.ts';
import { getInitialDetailData } from '../../core/useCase/productDetail/productDetail.ts';

export const initialState = {
  searchProduct: getInitialSearchData(),
  productDetail: getInitialDetailData()
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.saveDataToRedux:
      return {
        ...state,
        [action.key]: action.data
      };
    default:
      return state;
  }
}
