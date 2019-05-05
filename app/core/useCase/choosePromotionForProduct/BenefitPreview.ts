import { Benefit } from '../../model/Promotion/Benefit';

export interface BenefitPreview extends Benefit {
  selected: boolean;
  parent: BenefitPreview;
}

export interface CombineBenefitPreview extends BenefitPreview {
  children: BenefitPreview[];
}
