import 'whatwg-fetch';

import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from './actionTypes.js';


const loginFailureActionCreator = errMsg => ({
  type: LOGIN_FAILURE,
  errMsg,
});

const loginRequestActionCreator = () => ({
  type: LOGIN_REQUEST,
});


const loginSuccessActionCreator = () => ({
  type: LOGIN_SUCCESS,
});


const loginUserActionCreator = creds => {
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  };

  return dispatch => {
    dispatch(loginRequestActionCreator());

    const checkStatus = response => (
      response.ok ? response.json() : Promise.reject('Unable to log in.')
    );

    return fetch(`http://${window.location.host}/auth/tokens/`, config)
      .then(response => checkStatus(response))
      .then(json => {
        localStorage.setItem('user_token', json.token);
        dispatch(loginSuccessActionCreator());
      }).catch(err => dispatch(loginFailureActionCreator(err)));
  };
};


export {
  loginFailureActionCreator,
  loginRequestActionCreator,
  loginSuccessActionCreator,
  loginUserActionCreator,
};
