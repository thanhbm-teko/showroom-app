import { CustomerService } from './customer/interface';
import { OrderService } from './order/interface';
import { ProductService } from './product/interface';
import { PromotionService } from './promotion/interface';

export interface Service {
  name: string;
}

export type ServiceMap = { [serviceName: string]: Service };

const emptyService: Service = <Service>{};

class ServiceLocator {
  map: ServiceMap;

  constructor() {
    this.map = {};
  }

  setContext(map: ServiceMap): void {
    this.map = map;
  }

  get(serviceName: string): Service {
    return this.map[serviceName] || emptyService;
  }

  getCustomerService(): CustomerService {
    return <CustomerService>this.get('Customer');
  }

  getOrderService(): OrderService {
    return <OrderService>this.get('Order');
  }

  getProductService(): ProductService {
    return <ProductService>this.get('Product');
  }

  getPromotionService(): PromotionService {
    return <PromotionService>this.get('Promotion');
  }
}

export default new ServiceLocator();
