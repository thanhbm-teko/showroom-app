import { Service } from '../serviceLocator';
import { ResultCode, ApiResult } from '../../model/ResultCode';
import { Promotion } from '../../model/Promotion/promotion';

export interface PromotionListResult extends ApiResult {
  data: Promotion[];
}

export type PromotionListFunc = () => Promise<PromotionListResult>;

export interface PromotionService extends Service {
  list: PromotionListFunc;
}
