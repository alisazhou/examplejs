// in the sub-reducer, we get passed state.sellers as the state

import { SELECT_SELLER } from './currentSellerActions.js';

const initialState = -1;

const currentStateReducer = (state = initialState, action) => {
  if (action.type === SELECT_SELLER) {
    return action.sellerId;
  }
  return state;
};

export default currentStateReducer;
