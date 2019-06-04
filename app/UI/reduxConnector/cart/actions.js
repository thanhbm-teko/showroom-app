import types from '../actionTypes';
import * as useCaseCore from '../../../core/useCase/manipulateCart/manipulateCartProduct.ts';

const saveDataToRedux = data => ({
  type: types.saveDataToRedux,
  key: 'cart',
  data
});

export const addItemToCart = orderItem => {
  return async (dispatch, getState) => {
    let cartData = getState().cart;
    cartData = useCaseCore.addItemToCart(cartData, orderItem);
    dispatch(saveDataToRedux(cartData));
  };
};