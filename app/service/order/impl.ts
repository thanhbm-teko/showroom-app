import { ResultCode } from '../../core/model/ResultCode';
import { OrderService } from '../../core/service/order/interface';
import { CartData } from '../../core/useCase/manipulateCart/manipulateCart';

class OrderServiceImpl implements OrderService {
  name: 'Order';
  saveCart(cartData: CartData): Promise<ResultCode> {
    return new Promise((resolve, reject) => {
      resolve(ResultCode.Success);
    });
  }
}

export default new OrderServiceImpl();
