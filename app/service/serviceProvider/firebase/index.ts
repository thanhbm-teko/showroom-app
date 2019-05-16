import firebase from 'firebase';
import { ApiResult, getDefaultApiResult, ResultCode } from '../../../core/model/ResultCode';
import dbApi from './dbApi';

import LegacyPromotion = Firebase.LegacyPromotion;

class FirebaseService {
  async getLegacyPromotions(): Promise<ApiResult> {
    let r = getDefaultApiResult([]);
    try {
      let promotions = await dbApi.getLegacyPromotions();
      for (let key in promotions) {
        if (this.isConditionApplicable(promotions[key])) {
          let detail = await dbApi.getLegacyPromotionsDetail(key);
          r.data.push(detail);
        }
      }

      r.code = ResultCode.Success;
    } catch (error) {
      r.data = [];
      r.message = error.message;
    }
    return r;
  }

  isConditionApplicable(condition: LegacyPromotion.Condition): boolean {
    return condition.date.endDate > Date.now() && (!condition.branches || condition.branches.includes('CP09'));
  }
}

export default new FirebaseService();
