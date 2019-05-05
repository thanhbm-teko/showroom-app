import { ProductWQuantity } from './product';
import { VoucherWQuantity } from './Voucher';

export interface BenefitItem {
  discount: number;
  gifts: ProductWQuantity[];
  vouchers: VoucherWQuantity[];
  benefitIds: string[];
}

export interface OrderItem extends ProductWQuantity, BenefitItem {
  id: string;
}
