/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Select from 'react-select';

jest.unmock('./SearchBar.jsx');
import SearchBar from './SearchBar.jsx';


describe('SearchBar presentational component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<SearchBar />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a Select child component', () => {
    const select = result.props.children;
    expect(select.type).toBe(Select);
  });

});
