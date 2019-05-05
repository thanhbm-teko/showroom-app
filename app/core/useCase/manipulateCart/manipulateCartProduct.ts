import { CartData, addCart, getSelectedCart, deleteCart } from './manipulateCart';
import { OrderItem } from '../../model/OrderItem';
import ServiceLocator from '../../service/serviceLocator';

export function addItemToCart(cartData: CartData, orderItem: OrderItem): CartData {
  let selectedCart = getSelectedCart(cartData);
  if (!selectedCart) {
    cartData = addCart(cartData);
    selectedCart = getSelectedCart(cartData);
  }

  let newCartData = cloneCart(cartData);
  let idx = selectedCart.items.findIndex(i => i.id === orderItem.id);
  if (idx === -1) {
    newCartData.carts[cartData.selectedIdx] = {
      ...selectedCart,
      items: [...selectedCart.items, orderItem]
    };
  } else {
    let items = [...selectedCart.items];
    items[idx] = orderItem;
    newCartData.carts[cartData.selectedIdx] = {
      ...selectedCart,
      items
    };
  }

  ServiceLocator.getOrderService().saveCart(newCartData);
  return newCartData;
}

export function removeItemFromCart(cartData: CartData, itemId: string): CartData {
  let selectedCart = getSelectedCart(cartData);
  if (selectedCart) {
    let newCartData = cloneCart(cartData);
    let newCartItems = selectedCart.items.filter(i => i.id !== itemId);
    if (newCartItems.length > 0) {
      newCartData.carts[cartData.selectedIdx] = {
        ...selectedCart,
        items: newCartItems
      };
    } else {
      newCartData = deleteCart(newCartData, selectedCart.id);
    }

    ServiceLocator.getOrderService().saveCart(newCartData);
    return newCartData;
  }

  return cartData;
}

export function changeItemQuantityInCart(cartData: CartData, itemId: string, quantity: number): CartData {
  let selectedCart = getSelectedCart(cartData);
  if (selectedCart && quantity > 0) {
    let newCartData = cloneCart(cartData);
    let idx = selectedCart.items.findIndex(i => i.id === itemId);
    if (idx !== -1) {
      let items = [...selectedCart.items];
      items[idx] = { ...items[idx], quantity };
      newCartData.carts[cartData.selectedIdx] = {
        ...selectedCart,
        items
      };
    }

    ServiceLocator.getOrderService().saveCart(newCartData);
    return newCartData;
  }

  return cartData;
}

function cloneCart(cartData: CartData): CartData {
  return {
    ...cartData,
    carts: [...cartData.carts]
  };
}
