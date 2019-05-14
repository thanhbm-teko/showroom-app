import firebase from 'firebase';
import { ApiResult, getDefaultApiResult, ResultCode } from '../../../core/model/ResultCode';

class FirebaseService {
  async getLegacyPromotions(): Promise<ApiResult> {
    let r = getDefaultApiResult([]);
    try {
      let snapshot = await firebase
        .database()
        .ref(`simplified/promotions-v2/promotions`)
        .once('value');
      let promotions: { [key: string]: Firebase.LegacyPromotion.Condition } = snapshot.val() ? snapshot.val() : {};

      for (let key in promotions) {
        if (this.isConditionApplicable(promotions[key])) {
          let detail = await this.getLegacyPromotionsDetail(key);
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

  async getLegacyPromotionsDetail(key: string): Promise<Firebase.LegacyPromotion.Detail> {
    let snapshot = await firebase
      .database()
      .ref(`promotions-v2/promotions/${key}`)
      .once('value');
    let promotion = snapshot.val() ? <Firebase.LegacyPromotion.Detail>snapshot.val() : null;
    return promotion;
  }

  isConditionApplicable(condition: Firebase.LegacyPromotion.Condition): boolean {
    return condition.date.endDate > Date.now() && (!condition.branches || condition.branches.includes('CP09'));
  }
}

export default new FirebaseService();
