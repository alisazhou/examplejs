import 'whatwg-fetch';

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


const loginUser = creds => {
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: creds.username,
      password: creds.password,
    }),
  };

  return dispatch => {
    dispatch(loginRequest());

    return fetch('http://127.0.0.1:8000/auth/tokens/', config)
      .then(response => response.json())
      .then(json => { dispatch(loginSuccess(json)); });
  };
};


export { loginFailure, loginRequest, loginSuccess, loginUser };
