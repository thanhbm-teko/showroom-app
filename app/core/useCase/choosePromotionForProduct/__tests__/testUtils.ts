import { Benefit, CombineBenefit, BenefitType } from '../../../model/Promotion/Benefit';
import { PromotionPreview } from '../PromotionPreview';
import { BenefitPreview, CombineBenefitPreview } from '../BenefitPreview';
import Util from '../../../util';

import PROMOTIONS from '../../promotionProgram/__tests__/__fixtures__/promotions.json';
import BENEFIT_MULTI from './__fixtures__/benefit_multi.json';

export function makePromotionPreview(
  benefit: BenefitPreview,
  key: string = null,
  applyWithOther: boolean = false,
  selected: boolean = false
): PromotionPreview {
  return {
    ...PROMOTIONS[0],
    key: key || PROMOTIONS[0].key,
    applyWithOther: applyWithOther || PROMOTIONS[0].applyWithOther,
    benefit,
    selected
  };
}

export function makeBenefitPreview(benefit: Benefit, parent: BenefitPreview = null, selected: boolean = false): BenefitPreview {
  return {
    ...benefit,
    parent,
    id: Util.String.generateUuid(),
    selected
  };
}

export function makeAllOfBenefitPreview(children: BenefitPreview[], selected: boolean = false): CombineBenefitPreview {
  return makeCombineBenefitPreview(<CombineBenefit>{ ...BENEFIT_MULTI, type: BenefitType.allOf }, children, selected);
}

export function makeOneOfBenefitPreview(children: BenefitPreview[], selected: boolean = false): CombineBenefitPreview {
  return makeCombineBenefitPreview(<CombineBenefit>{ ...BENEFIT_MULTI, type: BenefitType.oneOf }, children, selected);
}

export function makeCombineBenefitPreview(
  benefit: CombineBenefit,
  children: BenefitPreview[],
  selected: boolean = false
): CombineBenefitPreview {
  let b = {
    ...benefit,
    parent: <BenefitPreview>null,
    children,
    id: Util.String.generateUuid(),
    selected
  };

  b.children.map(c => (c.parent = b));
  return b;
}
