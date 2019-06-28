import { ApiResult } from '../../apiDefine';
import * as DbApi from './dbApi';

export async function getLegacyPromotions(): Promise<ApiResult> {
  let r = getDefaultApiResult([]);
  try {
    let promotions = await DbApi.getLegacyPromotions();
    for (let key in promotions) {
      if (this.isConditionApplicable(promotions[key])) {
        let detail = await DbApi.getLegacyPromotionDetail(key);
        r.data.push(detail);
      }
    }

    r.data = r.data.filter((p: any) => p !== null);
    r.code = ResultCode.Success;
  } catch (error) {
    r.data = [];
    r.message = error.message;
  }
  return r;
}

export function isConditionApplicable(condition: FB.LegacyPromotion.Condition): boolean {
  return condition.date.endDate > Date.now() && (!condition.branches || condition.branches.includes('CP09'));
}
