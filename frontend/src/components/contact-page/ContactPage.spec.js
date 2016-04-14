/*eslint-env jest */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// import R from 'ramda';

jest.dontMock('./ContactPage.jsx');
const ContactPage = require('./ContactPage.jsx').default;

describe('StickyBody react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ContactPage/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
});
