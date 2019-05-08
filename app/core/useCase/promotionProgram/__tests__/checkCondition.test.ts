import { checkCondition } from '../checkCondition';
import { PartialInfoProduct } from '../../../model/Product';

import PRODUCT from '../../productDetail/__tests__/__fixtures__/product.json';
import { makeSkuCondition, makeCategoryCondition, makeOneOfCondition } from './testUtils';

describe('checkCondition', () => {
  let product = <PartialInfoProduct>PRODUCT;

  describe('when call with sku condition', () => {
    it('should return true when product matches sku', () => {
      let condition = makeSkuCondition('1204495');
      let res = checkCondition(product, condition);
      expect(res).toBe(true);
    });

    it('should return false when product does not match sku', () => {
      let condition = makeSkuCondition('1200000');
      let res = checkCondition(product, condition);
      expect(res).toBe(false);
    });
  });

  describe('when call with category condition', () => {
    it('should return true when product matches category exactly regardless of includeChildren', () => {
      let condition = makeCategoryCondition('03-N004-15', true);
      let res = checkCondition(product, condition);
      expect(res).toBe(true);

      condition = makeCategoryCondition('03-N004-15', false);
      res = checkCondition(product, condition);
      expect(res).toBe(true);
    });

    it('should return true when product matches parent category and includeChildren is true', () => {
      let condition = makeCategoryCondition('03-N004', true);
      let res = checkCondition(product, condition);
      expect(res).toBe(true);
    });

    it('should return false when product matches parent category and includeChildren is false', () => {
      let condition = makeCategoryCondition('03-N004', false);
      let res = checkCondition(product, condition);
      expect(res).toBe(false);
    });

    it('should return false when product does not match category regardless of includeChildren', () => {
      let condition = makeCategoryCondition('01-N004', true);
      let res = checkCondition(product, condition);
      expect(res).toBe(false);

      condition = makeCategoryCondition('01-N004', true);
      res = checkCondition(product, condition);
      expect(res).toBe(false);
    });
  });

  describe('when call with OR condition', () => {
    let skuCondition1 = makeSkuCondition('1204495');
    let skuCondition2 = makeSkuCondition('1200000');
    let skuCondition3 = makeSkuCondition('1900000');
    let categoryCondition1 = makeCategoryCondition('03-N004-15', true);
    let categoryCondition2 = makeCategoryCondition('01-N004', true);
    let categoryCondition3 = makeCategoryCondition('02-N004-15', true);

    describe('when OR condition contains 2 sku', () => {
      it('should return true when product matches one of skus', () => {
        let condition = makeOneOfCondition([skuCondition1, skuCondition2]);
        let res = checkCondition(product, condition);
        expect(res).toBe(true);
      });

      it('should return false when product does not match both skus', () => {
        let condition = makeOneOfCondition([skuCondition2, skuCondition3]);
        let res = checkCondition(product, condition);
        expect(res).toBe(false);
      });
    });

    describe('when OR condition contains 2 categories', () => {
      it('should return true when product matches one of categories', () => {
        let condition = makeOneOfCondition([categoryCondition1, categoryCondition2]);
        let res = checkCondition(product, condition);
        expect(res).toBe(true);
      });

      it('should return true when product does not match both categories', () => {
        let condition = makeOneOfCondition([categoryCondition2, categoryCondition3]);
        let res = checkCondition(product, condition);
        expect(res).toBe(false);
      });
    });

    describe('when OR condition contains 1 sku and 1 category', () => {
      it('should return true when product matches sku', () => {
        let condition = makeOneOfCondition([skuCondition1, categoryCondition2]);
        let res = checkCondition(product, condition);
        expect(res).toBe(true);
      });

      it('should return true when product matches category', () => {
        let condition = makeOneOfCondition([skuCondition2, categoryCondition1]);
        let res = checkCondition(product, condition);
        expect(res).toBe(true);
      });

      it('should return false when product does not match sku nor category', () => {
        let condition = makeOneOfCondition([skuCondition2, categoryCondition2]);
        let res = checkCondition(product, condition);
        expect(res).toBe(false);
      });
    });
  });
});
