import { Promotion } from '../../../core/model/Promotion/promotion';
import { GiftBenefit, DiscountBenefit, CombineBenefit, Benefit } from '../../../core/model/Promotion/Benefit';
import { BooleanCondition } from '../../../core/model/Promotion/Condition';

function convertPPMPromotion(ppmPromotion: PPM.Promotion): Promotion {
  let benefit = extractPPMPromotionBenefit(String(ppmPromotion.id), ppmPromotion.benefit);
  return {
    key: String(ppmPromotion.id),
    name: ppmPromotion.name,
    applyWithOther: false,
    promotionQuantity: {
      maxQuantity: 1000,
      remainQuantity: 1000
    },
    condition: <BooleanCondition>{ type: 'boolean', value: true },
    benefit
  };
}

function extractPPMPromotionBenefit(parentKey: string, benefit: PPM.Benefit): Benefit {
  let gifts = benefit.items
    ? benefit.items.map(
        item =>
          <GiftBenefit>{
            id: String(item.id),
            type: 'gift',
            product: { sku: item.sku },
            quantity: item.quantity
          }
      )
    : [];
  let discounts = benefit.money
    ? benefit.money.map(money => <DiscountBenefit>{ id: String(money.id), type: 'discount', value: money.money })
    : [];

  let children = [...gifts, ...discounts];
  return children.length > 1 ? <CombineBenefit>{ id: `${parentKey}`, type: 'allOf', children } : children[0];
}

export default {
  convertPPMPromotion
};
