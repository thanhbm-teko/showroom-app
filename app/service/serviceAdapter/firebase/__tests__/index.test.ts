import FirebaseAdapter from '../index';

import FB_PROMOTIONS from '../../../serviceProvider/firebase/__tests__/__fixtures__/legacy_promotions_detail.json';
import FB_CONVERTED_PROMOTIONS from './__fixtures__/fb_converted_promotions.json';

describe('convertLegacyPromotions', () => {
  it('should convert promotions from FirebaseLegacy format correctly', () => {
    let promotions = FirebaseAdapter.convertLegacyPromotions(<Firebase.LegacyPromotion.Detail>(
      (<unknown>FB_PROMOTIONS.Xa_hang_NVL_102018)
    ));
    expect(promotions).toEqual(FB_CONVERTED_PROMOTIONS);
  });
});
