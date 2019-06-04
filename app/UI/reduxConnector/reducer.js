import types from './actionTypes';
import { getInitialSearchData } from '../../core/useCase/searchProduct/searchProduct.ts';
import { getInitialDetailData } from '../../core/useCase/productDetail/productDetail.ts';
import { getInitialCartData } from '../../core/useCase/manipulateCart/manipulateCart.ts';

export const initialState = {
  searchProduct: getInitialSearchData(),
  productDetail: getInitialDetailData(),
  cart: getInitialCartData(),
  promotionsPreview: []
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
