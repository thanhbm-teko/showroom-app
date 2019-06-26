import { ResultCode } from '../../model/ResultCode';
import { searchProduct, ProductSearchData, getInitialSearchData } from '../searchProduct/searchProduct';
import ServiceLocator from '../../service/serviceLocator';
import { ProductDetailsData, getInitialDetailData, fetchProductDetail } from '../productDetail/productDetail';
import {
  fetchPromotions,
  getInitialPromotionData,
  PromotionData,
  getPromotionsForProduct
} from '../promotionProgram/promotionProgram';
import {
  getPromotionsPreview,
  choosePromotion,
  chooseBenefit,
  getPromotionApplyResult
} from '../choosePromotionForProduct/choosePromotion';
import { CombineBenefitPreview } from '../choosePromotionForProduct/BenefitPreview';
import { BenefitType } from '../../model/Promotion/Benefit';
import { Promotion } from '../../model/Promotion/promotion';
import { PromotionPreview } from '../choosePromotionForProduct/PromotionPreview';
import { OrderItem } from '../../model/OrderItem';
import { FullInfoProduct } from '../../model/Product';
import { CartData, getInitialCartData, getSelectedCart } from '../manipulateCart/manipulateCart';
import { addItemToCart } from '../manipulateCart/manipulateCartProduct';
import { ProductSearchResult, ProductDetailResult } from '../../service/product/interface';
import { PromotionListResult } from '../../service/promotion/interface';

import SEARCH_RESULTS from '../searchProduct/__tests__/__fixtures__/search_results.json';
import PRODUCT from '../productDetail/__tests__/__fixtures__/product.json';
import PROMOTIONS from '../promotionProgram/__tests__/__fixtures__/promotions.json';

describe('Add product to cart flow', () => {
  let searchData: ProductSearchData = getInitialSearchData();
  let detailData: ProductDetailsData = getInitialDetailData();
  let promotionData: PromotionData = getInitialPromotionData();
  let cartData: CartData = getInitialCartData();
  let promotions: Promotion[] = [];
  let promotionsPreview: PromotionPreview[] = [];
  let orderItem: OrderItem = null;
  let product: FullInfoProduct = null;

  beforeAll(() => {
    let mockSearchSuccessWResults = async () =>
      <ProductSearchResult>{ code: ResultCode.Success, data: SEARCH_RESULTS, message: '' };
    ServiceLocator.getProductService().search = jest.fn(mockSearchSuccessWResults);
    let mockGetDetailSuccessWResult = async () => <ProductDetailResult>{ code: ResultCode.Success, data: PRODUCT, message: '' };
    ServiceLocator.getProductService().getDetail = jest.fn(mockGetDetailSuccessWResult);
    let mockGetPromotionsSuccessWResults = async () =>
      <PromotionListResult>{ code: ResultCode.Success, data: <unknown>PROMOTIONS, message: '' };
    ServiceLocator.getPromotionService().list = jest.fn(mockGetPromotionsSuccessWResults);
    let mockSaveCartSuccess = async () => ResultCode.Success;
    ServiceLocator.getOrderService().saveCart = jest.fn(mockSaveCartSuccess);
  });

  it('search product for sku 123456 should return result', async () => {
    searchData = await searchProduct(searchData);
    expect(searchData.lastResultCode).toBe(ResultCode.Success);
    expect(searchData.results).toEqual(SEARCH_RESULTS);
  });

  it('then get product detail should return result', async () => {
    let sku = searchData.results[0].sku;
    detailData = await fetchProductDetail(detailData, sku);
    product = detailData.skus[sku].detail;
    expect(detailData.lastResultCode).toBe(ResultCode.Success);
    expect(product).toEqual(PRODUCT);
  });

  it('then should get list of promotions applicable to this product', async () => {
    promotionData = await fetchPromotions(promotionData);
    promotions = getPromotionsForProduct(promotionData, PRODUCT);
    expect(promotions).toContainEqual(PROMOTIONS[0]);
    expect(promotions).toContainEqual(PROMOTIONS[1]);
    expect(promotions).toContainEqual(PROMOTIONS[2]);
    expect(promotions).not.toContainEqual(PROMOTIONS[3]);
  });

  describe('then should construct a default structure for choosing promotion', () => {
    beforeAll(async () => {
      promotionsPreview = await getPromotionsPreview(promotions);
    });

    expectFirstAndSecondPromotionActivated();
  });

  describe('we can choose one promotion different to the default one', () => {
    beforeAll(async () => {
      await choosePromotion(promotionsPreview, promotionsPreview[2].key, async () => true);
    });

    expectSecondAndThirdPromotionActivated();
  });

  describe('we can switch to other promotion by select its benefit', () => {
    beforeAll(async () => {
      let benefit = <CombineBenefitPreview>promotionsPreview[0].benefit;
      await chooseBenefit(promotionsPreview, benefit.children[0].id, async () => true);
    });

    expectFirstAndSecondPromotionActivated();
  });

  describe('when add this orderItem to Cart', () => {
    it('should create a new Cart contain only that item', () => {
      cartData = addItemToCart(cartData, orderItem);
      let selectedCart = getSelectedCart(cartData);
      expect(selectedCart).toBeTruthy();
      expect(selectedCart.items).toEqual([orderItem]);
    });
  });

  function expectFirstAndSecondPromotionActivated() {
    it('should select the promotions correctly', () => {
      expect(promotionsPreview[0].selected).toBe(true);
      expect(promotionsPreview[1].selected).toBe(true);
      expect(promotionsPreview[2].selected).toBe(false);
    });

    it('should select the benefit of 1st promotion correctly', () => {
      let benefit = <CombineBenefitPreview>promotionsPreview[0].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.oneOf);
      expect(benefit.children[0].selected).toBe(true);
      expect(benefit.children[1].selected).toBe(false);
    });

    it('should select the benefit of 2nd promotion correctly', () => {
      let benefit = promotionsPreview[1].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.discount);
    });

    it('should select the benefit of 3rd promotion correctly', () => {
      let benefit = <CombineBenefitPreview>promotionsPreview[2].benefit;
      expect(benefit.selected).toBe(false);
      expect(benefit.type).toBe(BenefitType.allOf);
      expect(benefit.children[0].selected).toBe(false);
      expect(benefit.children[1].selected).toBe(false);
    });

    it('should calculate the promotion value correctly', () => {
      orderItem = getPromotionApplyResult({ product, quantity: 1 }, promotionsPreview);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.promotions).toEqual([
        {
          key: 'CTKM_1',
          name: 'Chương trình khuyến mãi 1',
          benefitIds: ['benefit-id-1', 'benefit-id-1-1'],
          discount: 25000,
          gifts: [],
          vouchers: []
        },
        {
          key: 'CTKM_2',
          name: 'Chương trình khuyến mãi 2 (đồng thời)',
          benefitIds: ['benefit-id-2'],
          discount: 10000,
          gifts: [],
          vouchers: []
        }
      ]);
    });
  }

  function expectSecondAndThirdPromotionActivated() {
    it('should select the promotions correctly', () => {
      expect(promotionsPreview[0].selected).toBe(false);
      expect(promotionsPreview[1].selected).toBe(true);
      expect(promotionsPreview[2].selected).toBe(true);
    });

    it('should select the benefit of 1st promotion correctly', () => {
      let benefit = <CombineBenefitPreview>promotionsPreview[0].benefit;
      expect(benefit.selected).toBe(false);
      expect(benefit.type).toBe(BenefitType.oneOf);
      expect(benefit.children[0].selected).toBe(false);
      expect(benefit.children[1].selected).toBe(false);
    });

    it('should select the benefit of 2nd promotion correctly', () => {
      let benefit = promotionsPreview[1].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.discount);
    });

    it('should select the benefit of 3rd promotion correctly', () => {
      let benefit = <CombineBenefitPreview>promotionsPreview[2].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.allOf);
      expect(benefit.children[0].selected).toBe(true);
      expect(benefit.children[1].selected).toBe(true);
    });

    it('should calculate the promotion value correctly', () => {
      orderItem = getPromotionApplyResult({ product, quantity: 1 }, promotionsPreview);
      expect(orderItem.product).toEqual(product);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.promotions).toEqual([
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
                name: 'Bàn laptop Mlucky Win',
                price: 100000,
                sku: '1200512'
              },
              quantity: 1
            }
          ],
          vouchers: []
        }
      ]);
    });
  }
});
