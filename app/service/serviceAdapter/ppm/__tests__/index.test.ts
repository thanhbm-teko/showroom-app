import PPMAdapter from '../index';

import PPM_PROMOTION from '../../../serviceProvider/ppm/__tests__/__fixtures__/ppm_promotion.json';
import PPM_CONVERTED_PROMOTION from './__fixtures__/ppm_converted_promotion.json';

describe('convertPPMPromotion', () => {
  it('should convert promotions from PPM format correctly', () => {
    let promotion = PPMAdapter.convertPPMPromotion(<PPM.Promotion>(<unknown>PPM_PROMOTION));
    expect(promotion).toEqual(PPM_CONVERTED_PROMOTION);
  });
});
