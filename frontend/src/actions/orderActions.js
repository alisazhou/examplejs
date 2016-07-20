import { UPDATE_ORDER, VALIDATE_ORDER } from './actionTypes.js';


const updateOrderActionCreator = update => ({
  type: UPDATE_ORDER,
  update,
});

const validateOrderActionCreator = field => ({
  type: VALIDATE_ORDER,
  field,
});

export { updateOrderActionCreator, validateOrderActionCreator };
