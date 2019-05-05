import { Benefit, PromotionQuantity } from './Benefit';
import { Condition } from './Condition';

export interface Promotion {
  key: string;
  name: string;
  promotionQuantity: PromotionQuantity;
  applyWithOther: boolean;
  condition: Condition;
  benefit: Benefit;
}
