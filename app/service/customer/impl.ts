import { ResultCode } from '../../core/model/ResultCode';
import { CustomerService, CustomerSearchResult } from '../../core/service/customer/interface';

export class CustomerServiceImpl implements CustomerService {
  name: 'Customer';
  search(phone: string): Promise<CustomerSearchResult> {
    return new Promise((resolve, reject) => {
      resolve({
        code: ResultCode.Success,
        message: 'success',
        data: []
      });
    });
  }
}
