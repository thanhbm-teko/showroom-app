import { Promotion } from '../../../core/model/Promotion/promotion';
import { GiftBenefit, DiscountBenefit, CombineBenefit } from '../../../core/model/Promotion/Benefit';
import { SkuCondition } from '../../../core/model/Promotion/Condition';

function convertLegacyPromotions(legacyPromotion: Firebase.LegacyPromotion.Detail): Promotion[] {
  let promotions = [];
  if (legacyPromotion) {
    let { key, name, branches, date, time, data } = legacyPromotion;
    for (let productKey in data) {
      let { promotionSkus, quantity, promotionPrice, sku } = data[key];
      let gifts = promotionSkus
        ? promotionSkus.map(
            giftSku =>
              <GiftBenefit>{
                id: `${key}-${productKey}-gift-${giftSku}`,
                type: 'gift',
                product: { sku: giftSku },
                quantity: 1
              }
          )
        : [];
      let discounts = promotionPrice
        ? [<DiscountBenefit>{ id: `${key}-${productKey}-discount-${promotionPrice}`, type: 'discount', value: promotionPrice }]
        : [];
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
        benefit: <CombineBenefit>{
          id: `${key}-${productKey}`,
          type: 'allOf',
          children: [...gifts, ...discounts]
        }
      });
    }
  }

  return promotions;
}

export default {
  convertLegacyPromotions
};
