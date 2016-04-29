/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./Seller.jsx');
const sellerModule = require('./Seller.jsx');
const Seller = sellerModule.default;

describe('Seller react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <Seller/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
});
