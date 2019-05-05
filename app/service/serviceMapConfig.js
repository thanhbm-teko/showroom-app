import CustomerServiceImpl from './customer/impl';
import OrderServiceImpl from './order/impl';
import ProductServiceImpl from './product/impl';
import PromotionServiceImpl from './promotion/impl';

export default {
  Customer: CustomerServiceImpl,
  Order: OrderServiceImpl,
  Product: ProductServiceImpl,
  Promotion: PromotionServiceImpl
};
