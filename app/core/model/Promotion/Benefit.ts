import { VoucherWQuantity } from '../Voucher';
import { ProductWQuantity } from '../product';

export enum BenefitType {
  allOf = 'allOf',
  oneOf = 'oneOf',
  gift = 'gift',
  discount = 'discount',
  voucher = 'voucher'
}

export interface PromotionQuantity {
  maxQuantity: number;
  remainQuantity: number;
}

export interface Benefit {
  id: string;
  type: BenefitType;
  promotionQuantity?: PromotionQuantity;
}

export interface CombineBenefit extends Benefit {
  children: Benefit[];
}

export interface GiftBenefit extends ProductWQuantity, Benefit {}

export interface DiscountBenefit extends Benefit {
  value: number;
}

export interface VoucherBenefit extends VoucherWQuantity, Benefit {}

export type BenefitProcessingFunc = (benefit: Benefit) => Benefit;

export function iterateBenefit(benefit: Benefit, handler: BenefitProcessingFunc): void {
  benefit = handler(benefit);
  if (benefit.type === BenefitType.allOf || benefit.type === BenefitType.oneOf) {
    let childrenBenefits = (<CombineBenefit>benefit).children;
    for (let b of childrenBenefits) {
      iterateBenefit(b, handler);
    }
  }
}
