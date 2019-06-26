import { Benefit, PromotionQuantity } from './Benefit';
import { Condition } from './Condition';

export interface PromotionBasicInfo {
  key: string;
  name: string;
}

export interface Promotion extends PromotionBasicInfo {
  promotionQuantity: PromotionQuantity;
  applyWithOther: boolean;
  condition: Condition;
  benefit: Benefit;
}
