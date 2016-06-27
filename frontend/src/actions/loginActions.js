import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from './actionTypes.js';


const loginFailure = errMsg => ({
  type: LOGIN_FAILURE,
  errMsg,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  token: user.token,
});


export { loginFailure, loginRequest, loginSuccess };
