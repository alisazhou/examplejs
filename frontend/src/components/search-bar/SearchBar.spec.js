/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Select from 'react-select';

jest.unmock('./SearchBar.jsx');
import WrappedBar, { SearchBar } from './SearchBar.jsx';
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


describe('SearchBar presentational component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const PROPS_FROM_STORE = {
    menus: [ {value: '', label: '' } ],
  };
  shallowRenderer.render(
    <SearchBar {...PROPS_FROM_STORE} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a Select child component', () => {
    const select = result.props.children;
    expect(select.type).toBe(Select);
  });
});

describe('SearchBar container component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedBar).not.toBe(SearchBar);
    expect(WrappedBar.WrappedComponent).toBe(SearchBar);
    expect(WrappedBar.displayName).toBe('Connect(SearchBar)');
  });

  it('receives menus from store', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedBar store={store} />
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.menus).toBeDefined();
  });
});
