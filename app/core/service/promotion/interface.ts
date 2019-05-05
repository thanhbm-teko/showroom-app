import { Service } from '../serviceLocator';
import { ResultCode } from '../../model/ResultCode';
import { Promotion } from '../../model/Promotion/promotion';

export interface PromotionListResult {
  code: ResultCode;
  data: Promotion[];
}

export type PromotionListFunc = () => Promise<PromotionListResult>;

export interface PromotionService extends Service {
  list: PromotionListFunc;
}
