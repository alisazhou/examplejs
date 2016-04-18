/*eslint-env jest */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./ContactPage.jsx');
const ContactPage = require('./ContactPage.jsx').default;

describe('ContactPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ContactPage/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
});
