/* eslint-env jest */
import React from 'react';

import menusReducer from './menusReducer.js';


describe('menus reducer', () => {
  it('initializes state', () => {
    const initialState = [
      {
        id: '0',
        name: 'Demo Menu 0',
        chef: 'cuckoo lis',
      },
      {
        id: '1',
        name: 'Demo Menu 1',
        chef: 'coco puffs',
      },
    ];
    const nextState = menusReducer(undefined, {});
    expect(nextState).toEqual(initialState);
  });
});
