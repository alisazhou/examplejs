import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./ContactPage.jsx');
import ContactPage from './ContactPage.jsx';

describe('ContactPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ContactPage/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
});
