/* eslint-env jasmine, jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./MenuDetails.jsx');
import MenuDetails from './MenuDetails.jsx';


describe('MenuDetails react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuDetails />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
});
