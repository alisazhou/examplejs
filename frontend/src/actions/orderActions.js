import { UPDATE_ORDER } from './actionTypes.js';


const updateOrderActionCreator = update => ({
  type: UPDATE_ORDER,
  update,
});
export { updateOrderActionCreator };
