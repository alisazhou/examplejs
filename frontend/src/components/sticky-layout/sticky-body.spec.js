/*eslint-env jest */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// import R from 'ramda';

jest.dontMock('./sticky-body.jsx');
const StickyBody = require('./sticky-body.jsx').default;

describe('StickyBody react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<StickyBody/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('renders with correct css classes', () => {
    expect(result.props.className).toEqual('sticky-layout--body');
  });
});
