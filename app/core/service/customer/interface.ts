import { Service } from '../serviceLocator';
import { ResultCode } from '../../model/ResultCode';
import { Customer } from '../../model/customer';

export interface CustomerSearchResult {
  code: ResultCode;
  message: string;
  data: Customer[];
}

export type SearchCustomerFunc = (phone: string) => Promise<CustomerSearchResult>;

export interface CustomerService extends Service {
  search: SearchCustomerFunc;
}
