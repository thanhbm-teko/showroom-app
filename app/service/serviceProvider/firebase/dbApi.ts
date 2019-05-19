import FbProxy from './fbProxy';
import DbCache from './dbCache';

class DbApi {
  async getLegacyPromotions(): Promise<{ [key: string]: Firebase.LegacyPromotion.Condition }> {
    let data = await this.fetchDbWithCache('simplified/promotions-v2/promotions');
    return <{ [key: string]: Firebase.LegacyPromotion.Condition }>(data || {});
  }

  async getLegacyPromotionDetail(key: string): Promise<Firebase.LegacyPromotion.Detail> {
    let data = await this.fetchDbWithCache(`promotions-v2/promotions/${key}`);
    return <Firebase.LegacyPromotion.Detail>data;
  }

  async fetchDbWithCache(path: string): Promise<any> {
    if (DbCache.isListening(path)) {
      return DbCache.get(path);
    } else {
      let snapshot = await FbProxy.getDb()
        .ref(path)
        .once('value');
      return snapshot.val();
    }
  }
}

export default new DbApi();
