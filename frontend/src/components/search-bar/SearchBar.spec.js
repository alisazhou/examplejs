import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { findInTree } from '../../testHelpers.js';

jest.unmock('./SearchBar.jsx');
import { SearchBar } from './SearchBar.jsx';


const PROPS_FROM_STORE = {
  cuisines: [ { id: 0, name: '0', key: 0 }, { id: 1, name: '1', key: 1 } ],
  fields: {
    searchCuisine: { value: '' },
    searchText: { value: '' },
  },
};
describe('SearchBar presentational component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <SearchBar {...PROPS_FROM_STORE}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('has a form child component', () => {
    expect(findInTree(result, 'form').length).toBe(1);
  });

  describe('within the form', () => {
    const form = findInTree(result, 'form')[0];
    it('has two Input child component', () => {
      const input = findInTree(form, 'input');
      expect(input.length).toEqual(2);
    });
    it('has two Input child components with the correct className', () => {
      const inputs = findInTree(form, 'input', {className: 'searchbar-form__search-field'});
      expect(inputs.length).toEqual(2);
    });
    it('has a Select child component', () => {
      const select = findInTree(form, 'select');
      expect(select.length).toEqual(1);
    });
    it('has a Select child component with the correct className', () => {
      const select = findInTree(form, 'select')[0];
      expect(select.props.className).toEqual('searchbar-form__search-field');
    });
    it('has the correct options', () => {
      const options = findInTree(form, 'option');
      expect(options.length).toEqual(PROPS_FROM_STORE.cuisines.length + 1);
    });

  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'cuisines', 'fields' ];
    R.forEach(
      prop => expect(R.has(prop)(SearchBar.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(SearchBar.propTypes).length).toEqual(expectedPropTypes.length);
  });
});
