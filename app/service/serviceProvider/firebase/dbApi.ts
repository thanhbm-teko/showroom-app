import * as FbProxy from './fbProxy';
import DbCache from './dbCache';

export async function getLegacyPromotions(): Promise<{ [key: string]: FB.LegacyPromotion.Condition }> {
  let data = await this.fetchDbWithCache('simplified/promotions-v2/promotions');
  return <{ [key: string]: FB.LegacyPromotion.Condition }>(data || {});
}

export async function getLegacyPromotionDetail(key: string): Promise<FB.LegacyPromotion.Detail> {
  let data = await this.fetchDbWithCache(`promotions-v2/promotions/${key}`);
  return <FB.LegacyPromotion.Detail>data;
}

export async function fetchDbWithCache(path: string): Promise<any> {
  if (DbCache.isListening(path)) {
    return DbCache.get(path);
  } else {
    let snapshot = await FbProxy.getDb()
      .ref(path)
      .once('value');
    return snapshot.val();
  }
}
