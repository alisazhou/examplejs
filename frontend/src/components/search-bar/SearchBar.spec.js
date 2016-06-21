/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';

jest.unmock('./SearchBar.jsx');
import { SearchBar } from './SearchBar.jsx';


const PROPS_FROM_STORE = {
  fields: {
    searchCuisine: { value: '' },
    searchText: { value: '' },
  },
};
describe('SearchBar presentational component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <SearchBar {...PROPS_FROM_STORE} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });

  it('has an input child component', () => {
    expect(result).toHaveChild('input');
  });

  describe('select child component', () => {
    const select = R.find(R.propEq('type', 'select'))(result.props.children);

    it('exists', () => {
      expect(select).toBeDefined();
    });
  });
});
