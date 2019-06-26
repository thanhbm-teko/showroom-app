import { ProductWQuantity } from './product';
import { VoucherWQuantity } from './Voucher';
import { PromotionBasicInfo } from './Promotion/promotion';

export interface BenefitSummary {
  discount: number;
  gifts: ProductWQuantity[];
  vouchers: VoucherWQuantity[];
  benefitIds: string[];
}

export interface PromotionSummary extends PromotionBasicInfo, BenefitSummary {}

export interface OrderItem extends ProductWQuantity {
  id: string;
  promotions: PromotionSummary[];
}
