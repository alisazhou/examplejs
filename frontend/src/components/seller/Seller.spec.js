/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./Seller.jsx');
const sellerModule = require('./Seller.jsx');
const Seller = sellerModule.default;

describe('Seller react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Seller name='sunny'/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('renders props.name', () => {
    expect(result.props.children).toContain('sunny');
  });
  it('has correct propTypes', () => {
    expect(R.has('name')(Seller.propTypes)).toBe(true);
  });
});
