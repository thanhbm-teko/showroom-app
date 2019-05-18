import FbProxy from '../fbProxy';
import DbCache from '../dbCache';
import DbApi from '../dbApi';
import { mockFirebaseDbReturn } from './testUtils';

const DATA = { sampleJson: { sampleKey: 'sampleContent' } };

describe('dbApi.fetchDbWithCache', () => {
  describe('when call', () => {
    beforeAll(() => {
      FbProxy.getDb = mockFirebaseDbReturn(DATA);
    });

    it('should return data get from firebase when this path is not listening', async () => {
      DbCache.isListening = jest.fn(() => false);
      let res = await DbApi.fetchDbWithCache('sample/path');
      expect(FbProxy.getDb().ref().once).toBeCalled();
      expect(res).toEqual(DATA);
    });

    it('should return data get from cache when this path is listening', async () => {
      DbCache.isListening = jest.fn(() => true);
      DbCache.get = jest.fn(() => DATA);
      let res = await DbApi.fetchDbWithCache('sample/path');
      expect(DbCache.get).toBeCalledWith('sample/path');
      expect(res).toEqual(DATA);
    });
  });
});

describe('dbApi.getLegacyPromotions', () => {
  describe('when call', () => {
    it('should call fetchDbWithCache with correct path', async () => {
      DbApi.fetchDbWithCache = jest.fn(async () => DATA);
      let res = await DbApi.getLegacyPromotions();

      expect(DbApi.fetchDbWithCache).toBeCalledWith('simplified/promotions-v2/promotions');
      expect(res).toEqual(DATA);
    });

    it('should return empty object when data from firebase is null', async () => {
      DbApi.fetchDbWithCache = jest.fn(async () => null);
      let res = await DbApi.getLegacyPromotions();

      expect(DbApi.fetchDbWithCache).toBeCalledWith('simplified/promotions-v2/promotions');
      expect(res).toEqual({});
    });
  });
});

describe('dbApi.getLegacyPromotionDetail', () => {
  describe('when call', () => {
    it('should call fetchDbWithCache with correct path', async () => {
      DbApi.fetchDbWithCache = jest.fn(async () => DATA);
      let res = await DbApi.getLegacyPromotionDetail('promo-key');

      expect(DbApi.fetchDbWithCache).toBeCalledWith(`promotions-v2/promotions/promo-key`);
      expect(res).toEqual(DATA);
    });
  });
});
