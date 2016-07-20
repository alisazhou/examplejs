import R from 'ramda';

import { UPDATE_ORDER, VALIDATE_ORDER } from './actionTypes.js';


const updateOrderActionCreator = update => ({
  type: UPDATE_ORDER,
  update,
});

const validateOrderActionCreator = field => ({
  type: VALIDATE_ORDER,
  field,
});

const validatePage = fields => dispatch =>
  R.forEach(R.compose(dispatch, validateOrderActionCreator), fields);

export {
  updateOrderActionCreator,
  validateOrderActionCreator,
  validatePage,
};
