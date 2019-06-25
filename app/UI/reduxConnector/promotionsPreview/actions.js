import _ from 'lodash';

import types from '../actionTypes';
import * as promotionUseCases from '../../../core/useCase/choosePromotionForProduct/choosePromotion.ts';

const saveDataToRedux = data => ({
  type: types.saveDataToRedux,
  key: 'promotionsPreview',
  data
});

export const initPromotionsPreview = promotions => {
  return async (dispatch, getState) => {
    let promotionsPreview = await promotionUseCases.getPromotionsPreview(promotions);
    dispatch(saveDataToRedux(promotionsPreview));
  };
};

export const choosePromotionProgram = (promotion, askUserWhenMeetPromotionConflict) => {
  return async (dispatch, getState) => {
    let promotionsPreview = _.cloneDeep(getState().promotionsPreview);
    await promotionUseCases.choosePromotion(promotionsPreview, promotion.key, askUserWhenMeetPromotionConflict);
    dispatch(saveDataToRedux(promotionsPreview));
  };
};

export const chooseBenefit = (benefit, askUserWhenMeetPromotionConflict) => {
  return async (dispatch, getState) => {
    let promotionsPreview = _.cloneDeep(getState().promotionsPreview);
    await promotionUseCases.chooseBenefit(promotionsPreview, benefit.id, askUserWhenMeetPromotionConflict);
    dispatch(saveDataToRedux(promotionsPreview));
  };
};
