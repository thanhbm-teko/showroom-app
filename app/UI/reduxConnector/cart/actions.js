import types from '../actionTypes';
import * as cartProductUseCases from '../../../core/useCase/manipulateCart/manipulateCartProduct.ts';
import * as cartUseCases from '../../../core/useCase/manipulateCart/manipulateCart.ts';

const saveDataToRedux = data => ({
  type: types.saveDataToRedux,
  key: 'cart',
  data
});

export const addItemToCart = orderItem => {
  return async (dispatch, getState) => {
    let cartData = getState().cart;
    cartData = cartProductUseCases.addItemToCart(cartData, orderItem);
    dispatch(saveDataToRedux(cartData));
  };
};

export const selectCart = cartId => {
  return async (dispatch, getState) => {
    let cartData = getState().cart;
    cartData = cartUseCases.selectCart(cartData, cartId);
    dispatch(saveDataToRedux(cartData));
  };
};

export const addCart = () => {
  return async (dispatch, getState) => {
    let cartData = getState().cart;
    cartData = cartUseCases.addCart(cartData);
    dispatch(saveDataToRedux(cartData));
  };
};

export const deleteCart = cartId => {
  return async (dispatch, getState) => {
    let cartData = getState().cart;
    cartData = cartUseCases.deleteCart(cartData, cartId);
    dispatch(saveDataToRedux(cartData));
  };
};
