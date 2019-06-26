import { ResultCode } from '../../model/ResultCode';
import { ProductWQuantity } from '../../model/Product';
import { OrderItem, PromotionSummary, BenefitSummary } from '../../model/OrderItem';
import { Promotion } from '../../model/Promotion/promotion';
import { PromotionPreview } from './PromotionPreview';
import { DecisionCallback } from '../../model/Function';
import {
  getBenefitValue,
  toggleBenefit,
  getDefaultBenefitPreview,
  joinBenefitSummary,
  getChosenPromotionAndBenefit,
  disableOtherOneOfBenefit
} from './chooseBenefit';
import Util from '../../util';

export async function getPromotionsPreview(
  promotions: Promotion[],
  suggestBenefitIds: string[] = []
): Promise<PromotionPreview[]> {
  let isFirstNonApplyWithOther = true;
  let promotionsPreview = promotions.map(p => {
    let selected = p.applyWithOther || isFirstNonApplyWithOther;
    isFirstNonApplyWithOther = isFirstNonApplyWithOther && p.applyWithOther;

    return {
      ...p,
      benefit: getDefaultBenefitPreview(p.benefit, selected),
      selected
    };
  });

  for (let benefitId of suggestBenefitIds) {
    await chooseBenefit(promotionsPreview, benefitId, async () => true);
  }

  return promotionsPreview;
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

export async function choosePromotion(
  promotions: PromotionPreview[],
  key: string,
  askUserForDecision: DecisionCallback
): Promise<ResultCode> {
  let res = ResultCode.Failure;
  let i = promotions.findIndex(p => p.key === key);
  if (i !== -1) {
    res = ResultCode.Success;
    if (!promotions[i].selected) {
      if (!promotions[i].applyWithOther) {
        res = await resolvePromotionConflict(promotions, promotions[i], askUserForDecision);
      } else {
        togglePromotion(promotions[i], true);
      }
    }
  }

  return res;
}

async function resolvePromotionConflict(
  promotions: PromotionPreview[],
  chosenPromotion: PromotionPreview,
  askUserForDecision: DecisionCallback
): Promise<ResultCode> {
  let res = ResultCode.Success;
  let conflictPromotions = promotions.filter(p => !p.applyWithOther && p.selected);
  if (conflictPromotions.length > 0) {
    let decision = await askUserForDecision();
    if (decision) {
      conflictPromotions.map(p => togglePromotion(p, false));
    } else {
      return ResultCode.Failure;
    }
  }

  togglePromotion(chosenPromotion, true);
  return res;
}

function togglePromotion(promotion: PromotionPreview, selected: boolean): void {
  promotion.selected = selected;
  toggleBenefit(promotion.benefit, selected);
}

export function getPromotionApplyResult(productWQuantity: ProductWQuantity, promotions: PromotionPreview[]): OrderItem {
  let applyResults: PromotionSummary[] = [];
  for (let p of promotions) {
    if (p.selected) {
      applyResults.push({
        key: p.key,
        name: p.name,
        ...getBenefitValue(p.benefit)
      });
    }
  }

  return {
    id: Util.String.generateUuid(),
    ...productWQuantity,
    promotions: applyResults
  };
}

export function getTotalBenefit(orderItem: OrderItem): BenefitSummary {
  let total: BenefitSummary = { discount: 0, gifts: [], vouchers: [], benefitIds: [] };
  for (let p of orderItem.promotions) {
    total = joinBenefitSummary(total, p);
  }

  return total;
}
