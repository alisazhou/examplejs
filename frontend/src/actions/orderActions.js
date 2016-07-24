import { UPDATE_ORDER, VALIDATE_ORDER } from './actionTypes.js';


const updateOrderActionCreator = update => ({
  type: UPDATE_ORDER,
  update,
});

const validateOrderActionCreator = (fieldName, validStatus) => ({
  type: VALIDATE_ORDER,
  fieldName, validStatus,
});

const updateAndValidate = field => dispatch => {
  dispatch(updateOrderActionCreator({[field.name]: field.value}));
  dispatch(validateOrderActionCreator(field.name, field.valid));
};

export {
  updateOrderActionCreator,
  validateOrderActionCreator,
  updateAndValidate,
};
