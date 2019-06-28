import { ResultCode, getDefaultApiResult } from '../../core/model/ResultCode';
import { PromotionService, PromotionListResult } from '../../core/service/promotion/interface';
import Teko from '../serviceProvider';
import Adapter from '../serviceAdapter';
import { Promotion } from '../../core/model/Promotion/promotion';

export class PromotionServiceImpl implements PromotionService {
  name: 'Promotion';

  async list(): Promise<PromotionListResult> {
    let r = await Teko.FirebaseService.getLegacyPromotions();

    if (r.code === ResultCode.Success) {
      let promotions: Promotion[] = [];
      for (let lp of r.data) {
        promotions = [...promotions, ...Adapter.Firebase.convertLegacyPromotions(<Firebase.LegacyPromotion.Detail>lp)];
      }
      r.data = promotions;
    }

    return r;
  }
}
