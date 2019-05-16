import firebase from 'firebase';

import LegacyPromotion = Firebase.LegacyPromotion;

async function getLegacyPromotions(): Promise<{ [key: string]: LegacyPromotion.Condition }> {
  let snapshot = await firebase
    .database()
    .ref(`simplified/promotions-v2/promotions`)
    .once('value');
  let promotions: { [key: string]: LegacyPromotion.Condition } = snapshot.val() ? snapshot.val() : {};
  return promotions;
}

async function getLegacyPromotionsDetail(key: string): Promise<LegacyPromotion.Detail> {
  let snapshot = await firebase
    .database()
    .ref(`promotions-v2/promotions/${key}`)
    .once('value');
  let promotion = snapshot.val() ? <LegacyPromotion.Detail>snapshot.val() : null;
  return promotion;
}

export default {
  getLegacyPromotions,
  getLegacyPromotionsDetail
};
