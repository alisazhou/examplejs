/* eslint-env jasmine, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  loginFailureActionCreator,
  loginRequestActionCreator,
  loginSuccessActionCreator,
    loginUserActionCreator,
} from './loginActions.js';
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
} from './actionTypes.js';


describe('synchronous action creators', () => {
  describe('loginFailure action creator', () => {
    it('should create LOGIN_FAILURE action', () => {
      const errMsg = 'errMsg0';
      const expAction = {
        type: LOGIN_FAILURE,
        errMsg,
      };
      const actualAction = loginFailureActionCreator(errMsg);
      expect(actualAction).toEqual(expAction);
    });
  });

  describe('loginRequest action creator', () => {
    it('should create LOGIN_REQUEST action', () => {
      const expAction = {
        type: LOGIN_REQUEST,
      };
      const actualAction = loginRequestActionCreator();
      expect(actualAction).toEqual(expAction);
    });
  });

  describe('loginSuccess action creator', () => {
    it('should create LOGIN_SUCCESS action', () => {
      const token = 'token0';
      const expAction = {
        type: LOGIN_SUCCESS,
        token: 'token0',
      };
      const actualAction = loginSuccessActionCreator(token);
      expect(actualAction).toEqual(expAction);
    });
  });

});


describe('async action creator loginUser', () => {
  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares)({ users: [] });
  const creds = { username: 'username1', password: 'qwerty123' };

  it('creates LOGIN_SUCCESS if 200', () => {
    const mockResponseText = { token: 'token for username1' };
    const mockResponse = { json: () => mockResponseText };
    const mockPromise = new Promise(resolve => resolve(mockResponse));
    spyOn(window, 'fetch').and.returnValue(mockPromise);
    const expActions = [
      loginRequestActionCreator(),
      loginSuccessActionCreator(mockResponseText.token),
    ];
    return mockStore.dispatch(loginUserActionCreator(creds))
      .then(() => {
        expect(mockStore.getActions()).toEqual(expActions);
      });
  });
});
