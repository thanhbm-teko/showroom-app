import types from '../actionTypes';
import * as useCaseCore from '../../../core/useCase/productDetail/productDetail.ts';

const saveDataToRedux = data => ({
  type: types.saveDataToRedux,
  key: 'productDetail',
  data
});

export const fetchProductDetail = sku => {
  return async (dispatch, getState) => {
    let productDetailData = getState().productDetail;
    productDetailData = await useCaseCore.fetchProductDetail(productDetailData, sku);
    dispatch(saveDataToRedux(productDetailData));
  };
};
