import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from '../actions/actionTypes.js';
import initialState from './authReducerInitialState.js';


const authReducer = (state = initialState, action) => {
  if (action.type === LOGIN_FAILURE) {
    return Object.assign({}, state, {
      errMsg: action.errMsg,
      isAuthenticated: false,
      isFetching: false,
    });
  } else if (action.type === LOGIN_REQUEST) {
    return Object.assign({}, state, {
      isAuthenticated: false,
      isFetching: true,
    });
  } else if (action.type === LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      isAuthenticated: true,
      isFetching: false,
      token: action.token,
    });
  }
  return state;
};

export default authReducer;
