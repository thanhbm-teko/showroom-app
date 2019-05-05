import CustomerServiceImpl from './customer/Impl';
import OrderServiceImpl from './order/Impl';
import ProductServiceImpl from './product/Impl';
import PromotionServiceImpl from './promotion/Impl';

export default {
  Customer: CustomerServiceImpl,
  Order: OrderServiceImpl,
  Product: ProductServiceImpl,
  Promotion: PromotionServiceImpl
};
