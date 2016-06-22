/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./SearchBar.jsx');
import { SearchBar } from './SearchBar.jsx';


const PROPS_FROM_STORE = {
  fields: {searchText: {value: '' }},
  menus: [ {
    id: '', name: '', chef: '', description: '', image: '',
    tagWords: [ '' ],
  } ],
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
    const inputBox = result.props.children;
    expect(inputBox.type).toBe('input');
  });
});
