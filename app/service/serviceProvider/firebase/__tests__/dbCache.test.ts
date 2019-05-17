import firebase from 'firebase';
import DbCache from '../dbCache';
import config from '../../../../config.json';

const DATA = { sampleJson: { sampleKey: 'sampleContent' } };

describe('dbCache.set', () => {
  describe('when call', () => {
    it('should write the data to database', () => {
      DbCache.set('test', DATA);
      expect(DbCache.database.test).toEqual(DATA);
    });

    it('should not touch other fields in database', () => {
      DbCache.set('test', DATA);
      DbCache.set('test/other', DATA);
      expect(DbCache.database.test).toEqual({ ...DATA, other: DATA });
      expect(DbCache.database.test.other).toEqual(DATA);
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

describe('dbCache.on', () => {
  describe('when call', () => {
    it('should set the data when received', () => {
      // jest.mock('firebase/app', () => {
      //   let snapshot = <firebase.database.DataSnapshot>{ val: () => DATA };
      //   return {
      //     initializeApp: jest.fn().mockReturnValue()
      //   };
      // });
      let snapshot = <firebase.database.DataSnapshot>{ val: () => DATA };
      firebase.initializeApp = jest.fn().mockReturnValue({
        database: jest.fn().mockReturnValue({
          ref: jest.fn().mockReturnThis(),
          on: jest.fn((eventType, callback) => callback(snapshot)),
          once: jest.fn(() => Promise.resolve(snapshot))
        })
      });
      DbCache.set = jest.fn();

      firebase.initializeApp(config.firebase);
      DbCache.on('test/on/a/path');
      expect(DbCache.monitorPaths).toContain('test/on/a/path');
      expect(DbCache.set).toBeCalledWith('test/on/a/path', DATA);
    });
  });
});
