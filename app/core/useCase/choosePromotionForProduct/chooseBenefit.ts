import { BenefitSummary } from '../../model/OrderItem';
import {
  GiftBenefit,
  DiscountBenefit,
  VoucherBenefit,
  BenefitType,
  Benefit,
  iterateBenefit,
  CombineBenefit
} from '../../model/Promotion/Benefit';
import { PromotionPreview } from './PromotionPreview';
import { BenefitPreview, CombineBenefitPreview } from './BenefitPreview';

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

export function getChosenPromotionAndBenefit(
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

export function disableOtherOneOfBenefit(benefit: BenefitPreview): void {
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

export function getBenefitValue(benefit: BenefitPreview): BenefitSummary {
  let summary: BenefitSummary = { discount: 0, gifts: [], vouchers: [], benefitIds: [] };

  if (benefit.selected) {
    summary.benefitIds = [benefit.id];
    switch (benefit.type) {
      case BenefitType.allOf:
      case BenefitType.oneOf:
        let childrenBenefits = (<CombineBenefitPreview>benefit).children;
        for (let b of childrenBenefits) {
          let result = getBenefitValue(b);
          summary = joinBenefitSummary(summary, result);
        }
        break;
      case BenefitType.gift:
        let giftBenefit = <GiftBenefit>(<unknown>benefit);
        summary.gifts = [{ product: giftBenefit.product, quantity: giftBenefit.quantity }];
        break;
      case BenefitType.discount:
        summary.discount = (<DiscountBenefit>(<unknown>benefit)).value;
        break;
      case BenefitType.voucher:
        let voucherBenefit = <VoucherBenefit>(<unknown>benefit);
        summary.vouchers = [{ voucher: voucherBenefit.voucher, quantity: voucherBenefit.quantity }];
        break;
    }
  }

  return summary;
}

export function joinBenefitSummary(bi1: BenefitSummary, bi2: BenefitSummary): BenefitSummary {
  return {
    discount: bi1.discount + bi2.discount,
    gifts: [...bi1.gifts, ...bi2.gifts],
    vouchers: [...bi1.vouchers, ...bi2.vouchers],
    benefitIds: [...bi1.benefitIds, ...bi2.benefitIds]
  };
}
