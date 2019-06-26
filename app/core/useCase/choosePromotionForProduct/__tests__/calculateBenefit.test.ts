import { Product } from '../../../model/Product';
import { OrderItem } from '../../../model/OrderItem';
import { Benefit } from '../../../model/Promotion/Benefit';
import { getPromotionApplyResult, getTotalBenefit } from '../choosePromotion';
import { makePromotionPreview, makeBenefitPreview, makeAllOfBenefitPreview, makeOneOfBenefitPreview } from './testUtils';

import PRODUCT from '../../productDetail/__tests__/__fixtures__/product.json';
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
      expect(orderItem.promotions).toEqual([
        {
          key: promotion.key,
          name: promotion.name,
          discount: 25000,
          gifts: [],
          vouchers: [],
          benefitIds: [discountBenefit.id]
        }
      ]);
    });

    it('should return promotion gift', () => {
      let promotion = makePromotionPreview(giftBenefit);
      promotion.selected = true;
      giftBenefit.selected = true;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.promotions).toEqual([
        {
          key: promotion.key,
          name: promotion.name,
          discount: 0,
          gifts: [{ product: { sku: '1200512', name: 'Bàn laptop Mlucky Win', price: 100000 }, quantity: 2 }],
          vouchers: [],
          benefitIds: [giftBenefit.id]
        }
      ]);
    });

    it('should return promotion voucher', () => {
      let promotion = makePromotionPreview(voucherBenefit);
      promotion.selected = true;
      voucherBenefit.selected = true;

      let orderItem: OrderItem = getPromotionApplyResult({ product, quantity: 1 }, [promotion]);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.promotions).toEqual([
        {
          key: promotion.key,
          name: promotion.name,
          discount: 0,
          gifts: [],
          vouchers: [{ voucher: { key: 'VOUCHER_APRIL_200K', name: 'Phiếu mua hàng 200K' }, quantity: 1 }],
          benefitIds: [voucherBenefit.id]
        }
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
      expect(orderItem.promotions).toEqual([
        {
          key: promotion.key,
          name: promotion.name,
          discount: 25000,
          gifts: [{ product: { sku: '1200512', name: 'Bàn laptop Mlucky Win', price: 100000 }, quantity: 2 }],
          vouchers: [{ voucher: { key: 'VOUCHER_APRIL_200K', name: 'Phiếu mua hàng 200K' }, quantity: 1 }],
          benefitIds: [allOfBenefit.id, discountBenefit.id, giftBenefit.id, voucherBenefit.id]
        }
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
      expect(orderItem.promotions).toEqual([
        {
          key: promotion.key,
          name: promotion.name,
          discount: 0,
          gifts: [{ product: { sku: '1200512', name: 'Bàn laptop Mlucky Win', price: 100000 }, quantity: 2 }],
          vouchers: [],
          benefitIds: [oneOfBenefit.id, giftBenefit.id]
        }
      ]);
    });
  });
});

describe('getTotalBenefit', () => {
  describe('when called', () => {
    it('should summary all discount, gifts and vouchers', () => {
      let orderItem: OrderItem = {
        id: '12345678',
        product: <Product>PRODUCT,
        quantity: 1,
        promotions: [
          {
            key: 'CTKM_2',
            name: 'Chương trình khuyến mãi 2 (đồng thời)',
            benefitIds: ['benefit-id-2'],
            discount: 10000,
            gifts: [],
            vouchers: []
          },
          {
            key: 'CTKM_3',
            name: 'Chương trình khuyến mãi 3',
            benefitIds: ['benefit-id-3', 'benefit-id-3-1', 'benefit-id-3-2'],
            discount: 15000,
            gifts: [
              {
                product: {
                  sku: '1200512'
                },
                quantity: 1
              }
            ],
            vouchers: []
          }
        ]
      };

      let benefit = getTotalBenefit(orderItem);
      expect(benefit.discount).toBe(25000);
      expect(benefit.gifts).toEqual([
        {
          product: {
            sku: '1200512'
          },
          quantity: 1
        }
      ]);
      expect(benefit.vouchers).toEqual([]);
    });
  });
});
