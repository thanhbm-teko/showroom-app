import { ResultCode } from '../../core/model/ResultCode';
import { PromotionService, PromotionListResult } from '../../core/service/promotion/interface';

class PromotionServiceImpl implements PromotionService {
  name: 'Promotion';
  list(): Promise<PromotionListResult> {
    return new Promise((resolve, reject) => {
      resolve({
        code: ResultCode.Success,
        data: []
      });
    });
  }
}

export default new PromotionServiceImpl();
