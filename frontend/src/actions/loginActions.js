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


const loginSuccessActionCreator = token => ({
  type: LOGIN_SUCCESS,
  token,
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

    return fetch(`http://${window.location.host}/auth/tokens/`, config)
      .then(response => response.json())
      .then(json => { dispatch(loginSuccessActionCreator(json.token)); });
  };
};


export {
  loginFailureActionCreator,
  loginRequestActionCreator,
  loginSuccessActionCreator,
  loginUserActionCreator,
};
