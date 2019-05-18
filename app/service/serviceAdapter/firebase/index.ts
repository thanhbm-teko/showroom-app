import { Promotion } from '../../../core/model/Promotion/promotion';
import { GiftBenefit, DiscountBenefit, CombineBenefit, Benefit } from '../../../core/model/Promotion/Benefit';
import { SkuCondition } from '../../../core/model/Promotion/Condition';

function convertLegacyPromotions(legacyPromotion: Firebase.LegacyPromotion.Detail): Promotion[] {
  let promotions = [];
  if (legacyPromotion) {
    let { key, name, branches, date, time, data } = legacyPromotion;
    for (let productKey in data) {
      let { quantity, sku } = data[productKey];
      let benefit = extractLegacyPromotionBenefit(`${key}-${productKey}`, data[productKey]);

      promotions.push({
        key,
        name,
        promotionQuantity: {
          maxQuantity: quantity,
          remainQuantity: quantity
        },
        applyWithOther: false,
        condition: <SkuCondition>{
          type: 'sku',
          sku
        },
        benefit
      });
    }
  }

  return promotions;
}

function extractLegacyPromotionBenefit(parentKey: string, dataBlock: Firebase.LegacyPromotion.DataBlock): Benefit {
  let { promotionSkus, promotionPrice } = dataBlock;
  let gifts = promotionSkus
    ? promotionSkus.map(
        giftSku =>
          <GiftBenefit>{
            id: `${parentKey}-gift-${giftSku}`,
            type: 'gift',
            product: { sku: giftSku },
            quantity: 1
          }
      )
    : [];
  let discounts = promotionPrice
    ? [<DiscountBenefit>{ id: `${parentKey}-discount-${promotionPrice}`, type: 'discount', value: promotionPrice }]
    : [];

  let children = [...gifts, ...discounts];
  return children.length > 1 ? <CombineBenefit>{ id: `${parentKey}`, type: 'allOf', children } : children[0];
}

export default {
  convertLegacyPromotions
};
