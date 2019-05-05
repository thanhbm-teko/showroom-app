import { Promotion } from '../../model/Promotion/promotion';
import { BenefitPreview } from './BenefitPreview';

export interface PromotionPreview extends Promotion {
  benefit: BenefitPreview;
  selected: boolean;
}
