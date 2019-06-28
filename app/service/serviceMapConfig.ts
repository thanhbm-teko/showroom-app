import { CustomerServiceImpl } from './customer/impl';
import { OrderServiceImpl } from './order/impl';
import { ProductServiceImplV2 } from './product/impl_v2';
import { PromotionServiceImpl } from './promotion/impl';

export default {
  Customer: new CustomerServiceImpl(),
  Order: new OrderServiceImpl(),
  Product: new ProductServiceImplV2(),
  Promotion: new PromotionServiceImpl()
};
