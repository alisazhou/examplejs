// in the sub-reducer, we get passed state.sellers as the state

import { FETCH_SELLERS_REQUEST } from '../actions/sellersActions.js';

const initialState = [
  { id: 3, name: 'vincent' },
  { id: 4, name: 'derek' },
  { id: 5, name: 'conrad' },
];

const sellersReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SELLERS_REQUEST:
    // set flag that fetching is in process
    break;
  case 'FETCH_SELLERS_SUCCESS':
    // unset flag that fetching is in process
    // change the redux store by returning sellers as the new state
    break;
  case 'FETCH_SELLERS_FAILURE':
    // unset flag that fetching is in process
    // display an error msg to user
    break;
  default:
    break;
  }
  return state;
};

export default sellersReducer;
