import { ResultCode } from '../../../model/ResultCode';
import { OrderItem } from '../../../model/OrderItem';
import ServiceLocator from '../../../service/serviceLocator';
import { CartData, Cart, getInitialCartData, getSelectedCart } from '../manipulateCart';
import { addItemToCart, removeItemFromCart, changeItemQuantityInCart } from '../manipulateCartProduct';

let mockSaveCartSuccess = async (cartData: CartData) => ResultCode.Success;
let cartData: CartData = null;
let selectedCart: Cart = null;
let orderItem1: OrderItem = {
  id: 'item-id-1',
  product: null,
  quantity: 1,
  discount: 0,
  gifts: [],
  vouchers: [],
  benefitIds: []
};
let orderItem1Clone: OrderItem = {
  id: 'item-id-1',
  product: null,
  quantity: 2,
  discount: 0,
  gifts: [],
  vouchers: [],
  benefitIds: []
};
let orderItem2: OrderItem = {
  id: 'item-id-2',
  product: null,
  quantity: 1,
  discount: 0,
  gifts: [],
  vouchers: [],
  benefitIds: []
};

describe('addItemToCart', () => {
  describe('when call', () => {
    beforeAll(() => {
      ServiceLocator.getOrderService().saveCart = jest.fn(mockSaveCartSuccess);
      cartData = getInitialCartData();
    });

    it('should add new cart to the cart list', () => {
      cartData = addItemToCart(cartData, orderItem1);
      selectedCart = getSelectedCart(cartData);
      expect(cartData.carts).toHaveLength(1);
      expect(selectedCart).toBeTruthy();
    });

    it('should contain only the item', () => {
      expect(selectedCart.items).toEqual([orderItem1]);
    });

    it('should save the cart', () => {
      expect(ServiceLocator.getOrderService().saveCart).toHaveBeenCalledWith(cartData);
    });

    it('should contain 2 items when add another item', () => {
      cartData = addItemToCart(cartData, orderItem2);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([orderItem1, orderItem2]);
    });

    it('should override old item when add item with same id', () => {
      cartData = addItemToCart(cartData, orderItem1Clone);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([orderItem1Clone, orderItem2]);
    });
  });
});

describe('removeItemFromCart', () => {
  describe('when call', () => {
    beforeAll(() => {
      ServiceLocator.getOrderService().saveCart = jest.fn(mockSaveCartSuccess);
      cartData = getInitialCartData();
      cartData = addItemToCart(cartData, orderItem1);
      cartData = addItemToCart(cartData, orderItem2);
    });

    it('should correctly remove item from current cart', () => {
      cartData = removeItemFromCart(cartData, 'item-id-1');
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([orderItem2]);
    });

    it('should save the cart', () => {
      expect(ServiceLocator.getOrderService().saveCart).toHaveBeenCalledWith(cartData);
    });

    it('should do nothing when item not exists in cart', () => {
      cartData = removeItemFromCart(cartData, 'item-id-not-exist');
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([orderItem2]);
    });

    it('should remove the cart when last item removed', () => {
      cartData = removeItemFromCart(cartData, 'item-id-2');
      selectedCart = getSelectedCart(cartData);
      expect(cartData.carts).toHaveLength(0);
      expect(cartData.selectedIdx).toBe(-1);
      expect(selectedCart).toBeFalsy();
    });
  });
});

describe('changeItemQuantityInCart', () => {
  describe('when call', () => {
    beforeAll(() => {
      ServiceLocator.getOrderService().saveCart = jest.fn(mockSaveCartSuccess);
      cartData = getInitialCartData();
      cartData = addItemToCart(cartData, orderItem1);
    });

    it('should correctly remove item from current cart', () => {
      cartData = changeItemQuantityInCart(cartData, 'item-id-1', 2);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([{ ...orderItem1, quantity: 2 }]);
    });

    it('should save the cart', () => {
      expect(ServiceLocator.getOrderService().saveCart).toHaveBeenCalledWith(cartData);
    });

    it('should do nothing when item not exists in cart', () => {
      cartData = changeItemQuantityInCart(cartData, 'item-id-not-exist', 3);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([{ ...orderItem1, quantity: 2 }]);
    });

    it('should do nothing when quantity is not positive', () => {
      cartData = changeItemQuantityInCart(cartData, 'item-id-1', 0);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([{ ...orderItem1, quantity: 2 }]);

      cartData = changeItemQuantityInCart(cartData, 'item-id-1', -1);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart.items).toEqual([{ ...orderItem1, quantity: 2 }]);
    });
  });
});
