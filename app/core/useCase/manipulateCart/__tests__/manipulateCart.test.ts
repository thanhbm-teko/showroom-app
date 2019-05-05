import { ResultCode } from '../../../model/ResultCode';
import ServiceLocator from '../../../service/serviceLocator';
import { CartData, getInitialCartData, addCart, deleteCart, getSelectedCart, Cart } from '../manipulateCart';
import Util from '../../../util';

let mockSaveCartSuccess = async (cartData: CartData) => ResultCode.Success;
let cartData: CartData = null;
let originalIdGenerator = Util.String.generateUuid;

describe('addCart', () => {
  describe('when call', () => {
    beforeAll(() => {
      Date.now = jest.fn(() => 123456789);
      Util.String.generateUuid = jest.fn(() => 'cart-1-uuid');
      ServiceLocator.getOrderService().saveCart = jest.fn(mockSaveCartSuccess);

      cartData = getInitialCartData();
      cartData = addCart(cartData);
    });

    it('should add new cart to the cart list', () => {
      expect(cartData.carts).toHaveLength(1);
      expect(cartData.carts[0]).toEqual({
        id: 'cart-1-uuid',
        createdAt: 123456789,
        items: []
      });
    });

    it('should add cart to end of the list', () => {
      Util.String.generateUuid = jest.fn(() => 'cart-2-uuid');
      cartData = addCart(cartData);
      expect(cartData.carts).toHaveLength(2);
      expect(cartData.carts[0].id).toBe('cart-1-uuid');
      expect(cartData.carts[1].id).toBe('cart-2-uuid');
    });

    it('should save the cart', () => {
      expect(ServiceLocator.getOrderService().saveCart).toHaveBeenCalledWith(cartData);
    });
  });
});

describe('deleteCart', () => {
  describe('when call', () => {
    beforeAll(() => {
      Date.now = jest.fn(() => 123456789);
      ServiceLocator.getOrderService().saveCart = jest.fn(mockSaveCartSuccess);

      cartData = getInitialCartData();
      Util.String.generateUuid = jest.fn(() => 'cart-1-uuid');
      cartData = addCart(cartData);
      Util.String.generateUuid = jest.fn(() => 'cart-2-uuid');
      cartData = addCart(cartData);
      Util.String.generateUuid = jest.fn(() => 'cart-3-uuid');
      cartData = addCart(cartData);
      cartData = deleteCart(cartData, 'cart-2-uuid');
    });

    it('should remove the cart match uuid', () => {
      expect(cartData.carts).toHaveLength(2);
      expect(cartData.carts[0].id).toBe('cart-1-uuid');
      expect(cartData.carts[1].id).toBe('cart-3-uuid');
    });

    it('should not delete any carts not match uuid', () => {
      cartData = deleteCart(cartData, 'cart-2-uuid');
      expect(cartData.carts).toHaveLength(2);
      expect(cartData.carts[0].id).toBe('cart-1-uuid');
      expect(cartData.carts[1].id).toBe('cart-3-uuid');
    });

    it('should save the cart', () => {
      expect(ServiceLocator.getOrderService().saveCart).toHaveBeenCalledWith(cartData);
    });
  });
});

describe('getSelectedCart', () => {
  let selectedCart: Cart = null;

  describe('when call', () => {
    beforeAll(() => {
      Util.String.generateUuid = originalIdGenerator;
      cartData = getInitialCartData();
    });

    it('should return null when no cart yet', () => {
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toBeFalsy();
    });

    it('should return the first cart when a cart is added', () => {
      cartData = addCart(cartData);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toEqual(cartData.carts[0]);
    });

    it('should return the second cart when another cart is added', () => {
      cartData = addCart(cartData);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toEqual(cartData.carts[1]);
    });

    it('should return the first cart when second cart is deleted', () => {
      cartData = deleteCart(cartData, cartData.carts[1].id);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toEqual(cartData.carts[0]);
    });

    it('should return the remain cart when another cart is added and first cart is deleted', () => {
      cartData = addCart(cartData);
      let newlyAddedCart = cartData.carts[1];
      cartData = deleteCart(cartData, cartData.carts[0].id);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toEqual(newlyAddedCart);
    });

    it('should set selectedIdx to -1 when all carts deleted', () => {
      cartData = deleteCart(cartData, cartData.carts[0].id);
      selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toBeFalsy();
      expect(cartData.selectedIdx).toBe(-1);
    });
  });
});
