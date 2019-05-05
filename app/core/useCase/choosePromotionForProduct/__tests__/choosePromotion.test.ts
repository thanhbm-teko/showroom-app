import { ResultCode } from '../../../model/ResultCode';
import { Benefit, BenefitType } from '../../../model/Promotion/Benefit';
import { PromotionPreview } from '../PromotionPreview';
import { choosePromotion, getPromotionsPreview } from '../choosePromotion';
import { CombineBenefitPreview } from '../BenefitPreview';
import { makePromotionPreview, makeBenefitPreview, makeOneOfBenefitPreview, makeAllOfBenefitPreview } from './testUtils';

import PROMOTIONS from '../../promotionProgram/__tests__/__fixtures__/promotions.json';
import BENEFIT_DISCOUNT from './__fixtures__/benefit_discount.json';
import BENEFIT_GIFT from './__fixtures__/benefit_gift.json';
import { Promotion } from '../../../model/Promotion/promotion';

describe('choosePromotion', () => {
  let discountBenefit = makeBenefitPreview(<Benefit>BENEFIT_DISCOUNT);
  let giftBenefit = makeBenefitPreview(<Benefit>BENEFIT_GIFT);
  let decisionCallbackYes = jest.fn(async () => true);
  let decisionCallbackNo = jest.fn(async () => false);
  let promotion1: PromotionPreview = null;
  let promotion2: PromotionPreview = null;
  let promotions: PromotionPreview[] = [];

  describe('when choose the promotion that CAN apply with other', () => {
    beforeEach(() => {
      promotion1 = makePromotionPreview(giftBenefit, 'key1', true);
      promotion2 = makePromotionPreview(discountBenefit, 'key2', false);
    });

    it('should select the chosen promotion', async () => {
      promotions = [<PromotionPreview>{ ...promotion1, selected: false }, <PromotionPreview>{ ...promotion2, selected: false }];

      let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(decisionCallbackYes).not.toBeCalled();
      expect(promotions[0].selected).toBe(true);
      expect(promotions[1].selected).toBe(false);
    });

    it('should not deselect other promotions', async () => {
      promotions = [<PromotionPreview>{ ...promotion1, selected: false }, <PromotionPreview>{ ...promotion2, selected: true }];

      let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(decisionCallbackYes).not.toBeCalled();
      expect(promotions[0].selected).toBe(true);
      expect(promotions[1].selected).toBe(true);
    });
  });

  describe('when choose the promotion that CANNOT apply with other', () => {
    beforeEach(() => {
      promotion1 = makePromotionPreview(giftBenefit, 'key1', false);
      promotion2 = makePromotionPreview(discountBenefit, 'key2', false);
    });

    it('should auto select the chosen promotion when no other promotions selected', async () => {
      promotions = [<PromotionPreview>{ ...promotion1, selected: false }, <PromotionPreview>{ ...promotion2, selected: false }];

      let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(decisionCallbackYes).not.toBeCalled();
      expect(promotions[0].selected).toBe(true);
      expect(promotions[1].selected).toBe(false);
    });

    describe('when there are promotions selected', () => {
      beforeEach(() => {
        promotions = [
          <PromotionPreview>{ ...promotion1, selected: false },
          <PromotionPreview>{ ...promotion2, selected: true }
        ];
      });

      it('should notice user that other promotions might lost', async () => {
        let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
        expect(res).toBe(ResultCode.Success);
        expect(decisionCallbackYes).toBeCalled();
      });

      it('should select the chosen promotion when user accept', async () => {
        let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
        expect(res).toBe(ResultCode.Success);
        expect(decisionCallbackYes).toBeCalled();
        expect(promotions[0].selected).toBe(true);
        expect(promotions[1].selected).toBe(false);
      });

      it('should not select the chosen promotion when user deny', async () => {
        let res = await choosePromotion(promotions, 'key1', decisionCallbackNo);
        expect(res).toBe(ResultCode.Failure);
        expect(decisionCallbackNo).toBeCalled();
        expect(promotions[0].selected).toBe(false);
        expect(promotions[1].selected).toBe(true);
      });
    });
  });

  describe('when choose the promotion that not in the list', () => {
    it('should keep the current promotions and return failure', async () => {
      promotion1 = makePromotionPreview(giftBenefit, 'key1', true);
      promotion2 = makePromotionPreview(discountBenefit, 'key2', false);
      promotions = [<PromotionPreview>{ ...promotion1, selected: false }, <PromotionPreview>{ ...promotion2, selected: false }];

      let res = await choosePromotion(promotions, 'key3', decisionCallbackYes);
      expect(res).toBe(ResultCode.Failure);
      expect(promotions[0].selected).toBe(false);
      expect(promotions[1].selected).toBe(false);
    });
  });

  describe('when choose the promotion', () => {
    it('should auto select its allOf-benefit', async () => {
      let parentAllOfBenefit = makeAllOfBenefitPreview([giftBenefit, discountBenefit]);
      promotion1 = makePromotionPreview(parentAllOfBenefit, 'key1', true, false);
      promotions = [promotion1];

      giftBenefit.selected = false;
      discountBenefit.selected = false;

      let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(giftBenefit.selected).toBe(true);
      expect(discountBenefit.selected).toBe(true);
    });

    it('should auto select its oneOf-benefit', async () => {
      let parentOneOfBenefit = makeOneOfBenefitPreview([giftBenefit, discountBenefit]);
      promotion1 = makePromotionPreview(parentOneOfBenefit, 'key1', true, false);
      promotions = [promotion1];

      giftBenefit.selected = false;
      discountBenefit.selected = false;

      let res = await choosePromotion(promotions, 'key1', decisionCallbackYes);
      expect(res).toBe(ResultCode.Success);
      expect(giftBenefit.selected).toBe(true);
      expect(discountBenefit.selected).toBe(false);
    });
  });
});

describe('getPromotionsPreview', () => {
  describe('when call with no suggested benefitIds', () => {
    let promotionPreview: PromotionPreview[] = [];

    beforeAll(async () => {
      promotionPreview = await getPromotionsPreview(<Promotion[]>(<unknown>PROMOTIONS));
    });

    it('should return the default structure', () => {
      expect(promotionPreview[0].selected).toBe(true);
      expect(promotionPreview[1].selected).toBe(true);
      expect(promotionPreview[2].selected).toBe(false);
    });

    it('should only select the first benefit of the first promotion', () => {
      let benefit = <CombineBenefitPreview>promotionPreview[0].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.oneOf);
      expect(benefit.children[0].selected).toBe(true);
      expect(benefit.children[1].selected).toBe(false);
    });

    it('should select the only benefit of the second promotion', () => {
      let benefit = promotionPreview[1].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.discount);
    });

    it('should select all benefits of the third promotion', () => {
      let benefit = <CombineBenefitPreview>promotionPreview[2].benefit;
      expect(benefit.selected).toBe(false);
      expect(benefit.type).toBe(BenefitType.allOf);
      expect(benefit.children[0].selected).toBe(false);
      expect(benefit.children[1].selected).toBe(false);
    });
  });

  describe('when call with suggested benefitIds', () => {
    let promotionPreview: PromotionPreview[] = [];

    beforeAll(async () => {
      promotionPreview = await getPromotionsPreview(<Promotion[]>(<unknown>PROMOTIONS), [
        'benefit-id-2',
        'benefit-id-3-1',
        'benefit-id-3-2'
      ]);
    });

    it('should return the structure according to suggest benefits', () => {
      expect(promotionPreview[0].selected).toBe(false);
      expect(promotionPreview[1].selected).toBe(true);
      expect(promotionPreview[2].selected).toBe(true);
    });

    it('should only select the first benefit of the first promotion', () => {
      let benefit = <CombineBenefitPreview>promotionPreview[0].benefit;
      expect(benefit.selected).toBe(false);
      expect(benefit.type).toBe(BenefitType.oneOf);
      expect(benefit.children[0].selected).toBe(false);
      expect(benefit.children[1].selected).toBe(false);
    });

    it('should select the only benefit of the second promotion', () => {
      let benefit = promotionPreview[1].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.discount);
    });

    it('should select all benefits of the third promotion', () => {
      let benefit = <CombineBenefitPreview>promotionPreview[2].benefit;
      expect(benefit.selected).toBe(true);
      expect(benefit.type).toBe(BenefitType.allOf);
      expect(benefit.children[0].selected).toBe(true);
      expect(benefit.children[1].selected).toBe(true);
    });
  });
});
