import types from './actionTypes';
import * as useCaseCore from '../../../core/useCase/productDetail/productDetail.ts';

const setData = data => ({
  type: types.setData_pd,
  data
});

export const fetchProductDetail = sku => {
  return async (dispatch, getState) => {
    let productDetailData = getState().productDetail;
    productDetailData = await useCaseCore.fetchProductDetail(productDetailData, sku);
    dispatch(setData(productDetailData));
  };
};
