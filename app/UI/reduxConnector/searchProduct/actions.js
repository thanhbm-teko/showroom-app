import types from './actionTypes';
import * as useCaseCore from '../../../core/useCase/searchProduct/searchProduct.ts';

const setData = data => ({
  type: types.setData,
  data
});

export const searchProduct = query => {
  return async (dispatch, getState) => {
    let searchData = getState().searchProduct;
    searchData = useCaseCore.setQuery(searchData, query);
    searchData = await useCaseCore.searchProduct(searchData);
    dispatch(setData(searchData));
  };
};

export const searchMoreProduct = () => {
  return async (dispatch, getState) => {
    let searchData = getState().searchProduct;
    searchData = await useCaseCore.searchMoreProduct(searchData);
    dispatch(setData(searchData));
  };
};
