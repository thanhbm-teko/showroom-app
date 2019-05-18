import { ResultCode, ApiResult } from '../../../core/model/ResultCode';
import { ApiFunc } from '../../../core/model/Function';
import PromotionServiceImpl from '../impl';
import Teko from '../../serviceProvider';

import LEGACY_PROMOTIONS_DETAIL from '../../serviceProvider/firebase/__tests__/__fixtures__/legacy_promotions_detail.json';
import PROMOTIONS from './__fixtures__/promotions.json';
import { PromotionListResult } from '../../../core/service/promotion/interface';

let mockSearchFailureNoResults = async () => <ApiResult>{ code: ResultCode.Failure, data: [], message: 'xyz' };
let mockSearchSuccessWResults = async () =>
  <ApiResult>{
    code: ResultCode.Success,
    data: [
      LEGACY_PROMOTIONS_DETAIL.Xa_hang_NVL_102018,
      LEGACY_PROMOTIONS_DETAIL.bucnhipdamme_022019,
      LEGACY_PROMOTIONS_DETAIL.conloc_giamgia_lenovo
    ],
    message: ''
  };
let r: PromotionListResult = null;

describe('PromotionServiceImpl.list', () => {
  async function listPromotionWithMock(mockFunction: ApiFunc): Promise<PromotionListResult> {
    Teko.FirebaseService.getLegacyPromotions = jest.fn(mockFunction);
    let r = await PromotionServiceImpl.list();
    return r;
  }

  describe('when PS service fail', () => {
    beforeAll(async () => {
      r = await listPromotionWithMock(mockSearchFailureNoResults);
    });

    it('should call Teko.PSService.search', () => {
      expect(Teko.FirebaseService.getLegacyPromotions).toBeCalledWith();
    });

    it('should return result according to result of Teko.PSService.search', () => {
      expect(r.code).toBe(ResultCode.Failure);
      expect(r.message).toBe('xyz');
      expect(r.data).toHaveLength(0);
    });
  });

  describe('when PS service success', () => {
    beforeAll(async () => {
      r = await listPromotionWithMock(mockSearchSuccessWResults);
    });

    it('should call Teko.PSService.search', () => {
      expect(Teko.FirebaseService.getLegacyPromotions).toBeCalledWith();
    });

    it('should return result according to result of Teko.PSService.search', () => {
      expect(r.code).toBe(ResultCode.Success);
      expect(r.message).toBe('');
      expect(r.data).toEqual(PROMOTIONS);
    });
  });
});
