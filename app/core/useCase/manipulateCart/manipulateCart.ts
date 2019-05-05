import ServiceLocator from '../../service/serviceLocator';
import { OrderItem } from '../../model/OrderItem';
import Util from '../../util';

export interface Cart {
  id: string;
  createdAt: number;
  items: OrderItem[];
}

export interface CartData {
  carts: Cart[];
  selectedIdx: number;
}

export function getInitialCartData(): CartData {
  return {
    carts: [],
    selectedIdx: -1
  };
}

export function getDefaultCart(): Cart {
  return {
    id: Util.String.generateUuid(),
    createdAt: Date.now(),
    items: []
  };
}

export function addCart(cartData: CartData): CartData {
  let newCartData = {
    carts: [...cartData.carts, getDefaultCart()],
    selectedIdx: cartData.selectedIdx + 1
  };

  ServiceLocator.getOrderService().saveCart(newCartData);
  return newCartData;
}

export function deleteCart(cartData: CartData, cartId: string): CartData {
  let selectedCart = getSelectedCart(cartData);
  let newCarts = cartData.carts.filter(c => c.id !== cartId);
  let newSelectedIdx = newCarts.findIndex(c => c.id === selectedCart.id);

  let newCartData = {
    carts: newCarts,
    selectedIdx: newSelectedIdx !== -1 ? newSelectedIdx : newCarts.length - 1
  };

  ServiceLocator.getOrderService().saveCart(newCartData);
  return newCartData;
}

export function getSelectedCart(cartData: CartData): Cart {
  return cartData.carts[cartData.selectedIdx];
}
