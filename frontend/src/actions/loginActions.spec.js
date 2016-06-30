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
  const creds = { username: 'username', password: 'password' };
  let mockStore;

  beforeEach(() => {
    mockStore = configureMockStore(middlewares)({ users: [] });
  });

  it('creates LOGIN_SUCCESS if 200', () => {
    const mockResponseJson = { token: 'token for username1' };
    const mockResponse = new Promise(resolve => resolve({
      json: () => new Promise(resolve => resolve(mockResponseJson)),
      ok: true,
    }));
    spyOn(window, 'fetch').and.returnValue(mockResponse);
    const expActions = [
      loginRequestActionCreator(),
      loginSuccessActionCreator(mockResponseJson.token),
    ];
    return mockStore.dispatch(loginUserActionCreator(creds))
      .then(() => {
        expect(mockStore.getActions()).toEqual(expActions);
      });
  });

  it('creates LOGIN_FAILURE if 400', () => {
    const mockResponse = new Promise(resolve => resolve({ ok: false }));
    spyOn(window, 'fetch').and.returnValue(mockResponse);
    const expActions = [
      loginRequestActionCreator(),
      loginFailureActionCreator('Unable to log in.'),
    ];
    return mockStore.dispatch(loginUserActionCreator(creds))
      .then(() => {
        expect(mockStore.getActions()).toEqual(expActions);
      });
  });
});
