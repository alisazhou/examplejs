/*eslint-env jest */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// import R from 'ramda';

jest.dontMock('./IntroPage.jsx');
const IntroPage = require('./IntroPage.jsx').default;

describe('StickyBody react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<IntroPage/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('was composed with PageWrapper', () => {
    expect(IntroPage.wrappedByPageWrapper).toBe(true);
  });
});
