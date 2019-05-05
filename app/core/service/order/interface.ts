import { Service } from '../serviceLocator';
import { ResultCode } from '../../model/ResultCode';
import { CartData } from '../../useCase/manipulateCart/manipulateCart';

export type SaveCartFunc = (cartData: CartData) => Promise<ResultCode>;

export interface OrderService extends Service {
  saveCart: SaveCartFunc;
}
