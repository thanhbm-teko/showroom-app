import { BenefitItem } from '../../model/OrderItem';
import {
  GiftBenefit,
  DiscountBenefit,
  VoucherBenefit,
  BenefitType,
  Benefit,
  iterateBenefit,
  CombineBenefit
} from '../../model/Promotion/Benefit';
import { ResultCode } from '../../model/ResultCode';
import { PromotionPreview } from './PromotionPreview';
import { DecisionCallback } from '../../model/Function';
import { BenefitPreview, CombineBenefitPreview } from './BenefitPreview';
import { choosePromotion } from './choosePromotion';

export function getDefaultBenefitPreview(
  benefit: Benefit,
  selected: boolean = true,
  parent: BenefitPreview = null
): BenefitPreview {
  let me = makeDefaultBenefitPreview(benefit, parent);
  toggleBenefit(me, selected);
  return me;
}

export function makeDefaultBenefitPreview(benefit: Benefit, parent: BenefitPreview = null): BenefitPreview {
  let me = {
    ...benefit,
    selected: false,
    parent
  };

  if (me.type === BenefitType.allOf || me.type === BenefitType.oneOf) {
    (<CombineBenefitPreview>me).children = (<CombineBenefit>benefit).children.map(c => makeDefaultBenefitPreview(c, me));
  }

  return me;
}

export async function chooseBenefit(
  promotions: PromotionPreview[],
  benefitId: string,
  askUserForDecision: DecisionCallback
): Promise<ResultCode> {
  let { benefit, promotion } = getChosenPromotionAndBenefit(promotions, benefitId);
  let res = await choosePromotion(promotions, promotion.key, askUserForDecision);
  if (res === ResultCode.Success) {
    toggleBenefit(benefit, true);
    disableOtherOneOfBenefit(benefit);
  }

  return res;
}

function getChosenPromotionAndBenefit(
  promotions: PromotionPreview[],
  benefitId: string
): { benefit: BenefitPreview; promotion: PromotionPreview } {
  let benefit: BenefitPreview = null;
  let promotion: PromotionPreview = null;

  for (let p of promotions) {
    iterateBenefit(p.benefit, (b: Benefit) => {
      if ((<BenefitPreview>b).id === benefitId) {
        benefit = <BenefitPreview>b;
        promotion = p;
      }
      return b;
    });
  }

  return { benefit, promotion };
}

function disableOtherOneOfBenefit(benefit: BenefitPreview): void {
  let b = benefit.parent;
  let currentSelected = benefit;
  while (b) {
    if (b.type === BenefitType.oneOf) {
      (<CombineBenefitPreview>b).children.map(c => c.id !== currentSelected.id && toggleBenefit(c, false));
    }
    currentSelected = b;
    b = b.parent;
  }
}

export function toggleBenefit(benefit: BenefitPreview, selected: boolean): void {
  benefit.selected = selected;
  if (benefit.type === BenefitType.allOf) {
    (<CombineBenefitPreview>benefit).children.map(c => toggleBenefit(c, selected));
  } else if (benefit.type === BenefitType.oneOf) {
    (<CombineBenefitPreview>benefit).children.map((c, i) => {
      toggleBenefit(c, i === 0 && selected);
    });
  }

  if (selected) {
    let iterator: BenefitPreview = benefit.parent;
    while (iterator) {
      iterator.selected = true;
      iterator = iterator.parent;
    }
  }
}

export function getBenefitValue(benefit: BenefitPreview): BenefitItem {
  let benefitItem: BenefitItem = { discount: 0, gifts: [], vouchers: [], benefitIds: [] };

  if (benefit.selected) {
    benefitItem.benefitIds = [benefit.id];
    switch (benefit.type) {
      case BenefitType.allOf:
      case BenefitType.oneOf:
        let childrenBenefits = (<CombineBenefitPreview>benefit).children;
        for (let b of childrenBenefits) {
          let result = getBenefitValue(b);
          benefitItem = joinBenefitItem(benefitItem, result);
        }
        break;
      case BenefitType.gift:
        let giftBenefit = <GiftBenefit>(<unknown>benefit);
        benefitItem.gifts = [{ product: giftBenefit.product, quantity: giftBenefit.quantity }];
        break;
      case BenefitType.discount:
        benefitItem.discount = (<DiscountBenefit>(<unknown>benefit)).value;
        break;
      case BenefitType.voucher:
        let voucherBenefit = <VoucherBenefit>(<unknown>benefit);
        benefitItem.vouchers = [{ voucher: voucherBenefit.voucher, quantity: voucherBenefit.quantity }];
        break;
    }
  }

  return benefitItem;
}

export function joinBenefitItem(bi1: BenefitItem, bi2: BenefitItem): BenefitItem {
  return {
    discount: bi1.discount + bi2.discount,
    gifts: [...bi1.gifts, ...bi2.gifts],
    vouchers: [...bi1.vouchers, ...bi2.vouchers],
    benefitIds: [...bi1.benefitIds, ...bi2.benefitIds]
  };
}
