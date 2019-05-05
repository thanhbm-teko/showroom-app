import { Promotion } from '../../model/Promotion/promotion';
import { ResultCode } from '../../model/ResultCode';
import { PartialInfoProduct } from '../../model/Product';
import ServiceLocator from '../../service/serviceLocator';
import { checkCondition } from './checkCondition';

export interface PromotionData {
  promotions: Promotion[];
}

export function getInitialPromotionData(): PromotionData {
  return {
    promotions: []
  };
}

export async function fetchPromotions(promotionData: PromotionData): Promise<PromotionData> {
  let res = await ServiceLocator.getPromotionService().list();

  if (res.code === ResultCode.Success) {
    promotionData = { ...promotionData, promotions: res.data };
  }

  return promotionData;
}

export function getPromotionsForProduct(promotionData: PromotionData, product: PartialInfoProduct) {
  return promotionData.promotions.filter(p => checkCondition(product, p.condition));
}
