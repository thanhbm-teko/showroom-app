import FbProxy from '../fbProxy';
import DbCache from '../dbCache';
import { mockFirebaseDbReturn } from './testUtils';

const DATA = { sampleJson: { sampleKey: 'sampleContent' } };

describe('dbCache.set', () => {
  describe('when call', () => {
    it('should write the data to database', () => {
      DbCache.set('test', DATA);
      expect(DbCache.database.test).toEqual(DATA);
    });

    it('should not clear other existing data in database', () => {
      DbCache.set('test/other', DATA);
      DbCache.set('test/another/data', DATA);
      expect(DbCache.database.test).toEqual({ ...DATA, other: DATA, another: { data: DATA } });
      expect(DbCache.database.test.other).toEqual(DATA);
      expect(DbCache.database.test.another.data).toEqual(DATA);
    });
  });
});

describe('dbCache.get', () => {
  describe('when call', () => {
    it('should get the correct data', () => {
      DbCache.database = { test: DATA };
      expect(DbCache.get('test')).toEqual(DATA);
    });

    it('should get the correct data with unexisted path', () => {
      DbCache.database = { test: DATA };
      expect(DbCache.get('test/an/unexisted/path')).toBeFalsy();
    });
  });
});

describe('dbCache.listen', () => {
  describe('when call', () => {
    beforeAll(() => {
      FbProxy.getDb = mockFirebaseDbReturn(DATA);
      DbCache.set = jest.fn();
      DbCache.listen('test/on/a/path');
    });

    it('should add the path to listen list', () => {
      expect(DbCache.listeningPaths).toContain('test/on/a/path');
    });

    it('should call firebase.database.on', () => {
      expect(FbProxy.getDb().ref().on).toBeCalled();
    });

    it('should set the data when received', () => {
      expect(DbCache.set).toBeCalledWith('test/on/a/path', DATA);
    });

    it('isListening should return true', () => {
      expect(DbCache.isListening('test/on/a/path')).toBe(true);
    });

    describe('dbCache.unlisten', () => {
      describe('when call', () => {
        beforeAll(() => {
          DbCache.unlisten('test/on/a/path');
        });

        it('should remove the path from listen list', () => {
          expect(DbCache.listeningPaths).not.toContain('test/on/a/path');
        });

        it('should call firebase.database.off', () => {
          expect(FbProxy.getDb().ref().off).toBeCalled();
        });

        it('should unset the data', () => {
          expect(DbCache.set).toBeCalledWith('test/on/a/path', null);
        });

        it('isListening should return false', () => {
          expect(DbCache.isListening('test/on/a/path')).toBe(false);
        });
      });
    });
  });
});
