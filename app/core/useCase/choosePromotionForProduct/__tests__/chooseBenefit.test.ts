import { ResultCode } from '../../../model/ResultCode';
import { Benefit } from '../../../model/Promotion/Benefit';
import { PromotionPreview } from '../PromotionPreview';
import { BenefitPreview, CombineBenefitPreview } from '../BenefitPreview';
import { chooseBenefit } from '../choosePromotion';
import { getDefaultBenefitPreview } from '../chooseBenefit';

import { makePromotionPreview, makeBenefitPreview, makeAllOfBenefitPreview, makeOneOfBenefitPreview } from './testUtils';

import BENEFIT_DISCOUNT from './__fixtures__/benefit_discount.json';
import BENEFIT_GIFT from './__fixtures__/benefit_gift.json';

let discountBenefit = makeBenefitPreview(<Benefit>BENEFIT_DISCOUNT);
let giftBenefit = makeBenefitPreview(<Benefit>BENEFIT_GIFT);

describe('chooseBenefit', () => {
  let decisionCallbackYes = jest.fn(async () => true);
  let decisionCallbackNo = jest.fn(async () => false);
  let promotion1: PromotionPreview = null;
  let promotion2: PromotionPreview = null;
  let promotions: PromotionPreview[] = [];

  describe('when called', () => {
    it('should select the promotion containing that benefit', async () => {
      promotion1 = makePromotionPreview(giftBenefit, 'key1', true, false);
      promotion2 = makePromotionPreview(discountBenefit, 'key2', false, false);
      promotions = [promotion1, promotion2];

      let res = await chooseBenefit(promotions, giftBenefit.id, decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(promotions[0].selected).toBe(true);
      expect(promotions[1].selected).toBe(false);
    });

    it('should select the benefit', async () => {
      promotion1 = makePromotionPreview(giftBenefit, 'key1', true, false);
      promotions = [promotion1];

      let res = await chooseBenefit(promotions, giftBenefit.id, decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(promotions[0].benefit.selected).toBe(true);
    });

    it('should select only the first child of a oneOf-benefit', async () => {
      let oneOfBenefit = makeOneOfBenefitPreview([discountBenefit, giftBenefit]);
      promotion1 = makePromotionPreview(oneOfBenefit, 'key1', true, false);
      promotions = [promotion1];

      let res = await chooseBenefit(promotions, oneOfBenefit.id, decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(discountBenefit.selected).toBe(true);
      expect(giftBenefit.selected).toBe(false);
    });

    it('should select all children of a allOf-benefit', async () => {
      let allOfBenefit = makeAllOfBenefitPreview([discountBenefit, giftBenefit]);
      promotion1 = makePromotionPreview(allOfBenefit, 'key1', true, false);
      promotions = [promotion1];

      let res = await chooseBenefit(promotions, allOfBenefit.id, decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(discountBenefit.selected).toBe(true);
      expect(giftBenefit.selected).toBe(true);
    });

    describe('when select a child of oneOf-benefit', () => {
      it('should disable his sibling benefits', async () => {
        let oneOfBenefit = makeOneOfBenefitPreview([discountBenefit, giftBenefit]);
        promotion1 = makePromotionPreview(oneOfBenefit, 'key1', true, false);
        promotions = [promotion1];

        giftBenefit.selected = false;
        discountBenefit.selected = true;

        let res = await chooseBenefit(promotions, giftBenefit.id, decisionCallbackYes);
        expect(res).toBe(ResultCode.Success);
        expect(giftBenefit.selected).toBe(true);
        expect(discountBenefit.selected).toBe(false);
      });

      describe('when has cousin benefits', () => {
        let discountBenefit2: BenefitPreview = null;
        let giftBenefit2: BenefitPreview = null;
        let oneOfBenefit1: BenefitPreview = null;
        let oneOfBenefit2: BenefitPreview = null;

        beforeEach(() => {
          discountBenefit2 = makeBenefitPreview(<Benefit>BENEFIT_DISCOUNT);
          giftBenefit2 = makeBenefitPreview(<Benefit>BENEFIT_GIFT);
          oneOfBenefit1 = makeOneOfBenefitPreview([discountBenefit, giftBenefit]);
          oneOfBenefit2 = makeOneOfBenefitPreview([discountBenefit2, giftBenefit2]);
        });

        it('should disable his cousin oneOf-benefits', async () => {
          let parentOneOfBenefit = makeOneOfBenefitPreview([oneOfBenefit1, oneOfBenefit2]);
          promotion1 = makePromotionPreview(parentOneOfBenefit, 'key1', true, false);
          promotions = [promotion1];

          giftBenefit.selected = false;
          discountBenefit.selected = false;
          giftBenefit2.selected = true;
          discountBenefit2.selected = false;

          let res = await chooseBenefit(promotions, giftBenefit.id, decisionCallbackYes);
          expect(res).toBe(ResultCode.Success);
          expect(giftBenefit.selected).toBe(true);
          expect(discountBenefit.selected).toBe(false);
          expect(giftBenefit2.selected).toBe(false);
          expect(discountBenefit2.selected).toBe(false);
        });

        it('should NOT disable his cousin allOf-benefits', async () => {
          let parentAllOfBenefit = makeAllOfBenefitPreview([oneOfBenefit1, oneOfBenefit2]);
          promotion1 = makePromotionPreview(parentAllOfBenefit, 'key1', true, false);
          promotions = [promotion1];

          giftBenefit.selected = false;
          discountBenefit.selected = true;
          giftBenefit2.selected = false;
          discountBenefit2.selected = true;

          let res = await chooseBenefit(promotions, giftBenefit.id, decisionCallbackYes);
          expect(res).toBe(ResultCode.Success);
          expect(giftBenefit.selected).toBe(true);
          expect(discountBenefit.selected).toBe(false);
          expect(giftBenefit2.selected).toBe(false);
          expect(discountBenefit2.selected).toBe(true);
        });
      });
    });
  });
});

describe('getDefaultBenefitPreview', () => {
  describe('when called', () => {
    it('should return the default benefit preview', () => {
      let benefitPreview = getDefaultBenefitPreview(discountBenefit);
      expect(typeof benefitPreview.id).toBe('string');
      expect(benefitPreview.selected).toBe(true);
      expect(benefitPreview.parent).toBe(null);
    });

    it('should return the default benefit preview for oneOf-benefit', () => {
      let parentOneOfBenefit = makeOneOfBenefitPreview([discountBenefit, giftBenefit]);
      let benefitPreview = <CombineBenefitPreview>getDefaultBenefitPreview(parentOneOfBenefit);
      expect(typeof benefitPreview.id).toBe('string');
      expect(benefitPreview.selected).toBe(true);
      expect(benefitPreview.parent).toBe(null);

      expect(typeof benefitPreview.children[0].id).toBe('string');
      expect(benefitPreview.children[0].selected).toBe(true);
      expect(benefitPreview.children[0].parent).toBe(benefitPreview);
      expect(typeof benefitPreview.children[1].id).toBe('string');
      expect(benefitPreview.children[1].selected).toBe(false);
      expect(benefitPreview.children[1].parent).toBe(benefitPreview);
    });

    it('should return the default benefit preview for allOf-benefit', () => {
      let parentAllOfBenefit = makeAllOfBenefitPreview([discountBenefit, giftBenefit]);
      let benefitPreview = <CombineBenefitPreview>getDefaultBenefitPreview(parentAllOfBenefit);
      expect(typeof benefitPreview.id).toBe('string');
      expect(benefitPreview.selected).toBe(true);
      expect(benefitPreview.parent).toBe(null);

      expect(typeof benefitPreview.children[0].id).toBe('string');
      expect(benefitPreview.children[0].selected).toBe(true);
      expect(benefitPreview.children[0].parent).toBe(benefitPreview);
      expect(typeof benefitPreview.children[1].id).toBe('string');
      expect(benefitPreview.children[1].selected).toBe(true);
      expect(benefitPreview.children[1].parent).toBe(benefitPreview);
    });
  });
});
