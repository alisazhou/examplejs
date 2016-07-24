import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./HowItWorks.jsx');
import HowItWorks from './HowItWorks.jsx';


describe('HowItWorks presentational component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<HowItWorks/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a header', () => {
    expect(result.type).toBe('header');
  });
});
