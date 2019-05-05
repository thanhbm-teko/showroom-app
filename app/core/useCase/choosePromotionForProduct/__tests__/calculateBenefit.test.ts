import { Product } from '../../../model/Product';
import { OrderItem } from '../../../model/OrderItem';
import { Benefit } from '../../../model/Promotion/Benefit';
import { getPromotionApplyResult } from '../choosePromotion';
import { makePromotionPreview, makeBenefitPreview, makeAllOfBenefitPreview, makeOneOfBenefitPreview } from './testUtils';

import PRODUCT from '../../getProductDetail/__tests__/__fixtures__/product.json';
import BENEFIT_DISCOUNT from './__fixtures__/benefit_discount.json';
import BENEFIT_VOUCHER from './__fixtures__/benefit_voucher.json';
import BENEFIT_GIFT from './__fixtures__/benefit_gift.json';

describe('getPromotionApplyResult', () => {
  describe('when called', () => {
    let product: Product = null;
    let discountBenefit = makeBenefitPreview(<Benefit>BENEFIT_DISCOUNT);
    let giftBenefit = makeBenefitPreview(<Benefit>BENEFIT_GIFT);
    let voucherBenefit = makeBenefitPreview(<Benefit>BENEFIT_VOUCHER);

    beforeAll(() => {
      product = <Product>PRODUCT;
    });

    it('should return promotion price', () => {
      let promotion = makePromotionPreview(discountBenefit);
      promotion.selected = true;
      discountBenefit.selected = true;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.discount).toBe(25000);
      expect(orderItem.gifts).toEqual([]);
      expect(orderItem.vouchers).toEqual([]);
    });

    it('should return promotion gift', () => {
      let promotion = makePromotionPreview(giftBenefit);
      promotion.selected = true;
      giftBenefit.selected = true;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.discount).toBe(0);
      expect(orderItem.gifts).toEqual([
        { product: { sku: '1200512', name: 'Bàn laptop Mlucky Win', price: 100000 }, quantity: 2 }
      ]);
      expect(orderItem.vouchers).toEqual([]);
    });

    it('should return promotion voucher', () => {
      let promotion = makePromotionPreview(voucherBenefit);
      promotion.selected = true;
      voucherBenefit.selected = true;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.discount).toBe(0);
      expect(orderItem.gifts).toEqual([]);
      expect(orderItem.vouchers).toEqual([
        { voucher: { key: 'VOUCHER_APRIL_200K', name: 'Phiếu mua hàng 200K' }, quantity: 1 }
      ]);
    });

    it('should return all of promotion discount and gift', () => {
      let allOfBenefit = makeAllOfBenefitPreview([discountBenefit, giftBenefit, voucherBenefit]);
      let promotion = makePromotionPreview(allOfBenefit);
      promotion.selected = true;
      allOfBenefit.selected = true;
      discountBenefit.selected = true;
      giftBenefit.selected = true;
      voucherBenefit.selected = true;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.discount).toBe(25000);
      expect(orderItem.gifts).toEqual([
        { product: { sku: '1200512', name: 'Bàn laptop Mlucky Win', price: 100000 }, quantity: 2 }
      ]);
      expect(orderItem.vouchers).toEqual([
        { voucher: { key: 'VOUCHER_APRIL_200K', name: 'Phiếu mua hàng 200K' }, quantity: 1 }
      ]);
    });

    it('should return only selected benefit', () => {
      let oneOfBenefit = makeOneOfBenefitPreview([giftBenefit, discountBenefit]);
      let promotion = makePromotionPreview(oneOfBenefit, 'key1', true, false);
      promotion.selected = true;
      oneOfBenefit.selected = true;
      giftBenefit.selected = true;
      discountBenefit.selected = false;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.discount).toBe(0);
      expect(orderItem.gifts).toEqual([
        { product: { sku: '1200512', name: 'Bàn laptop Mlucky Win', price: 100000 }, quantity: 2 }
      ]);
      expect(orderItem.vouchers).toEqual([]);
    });
  });
});
