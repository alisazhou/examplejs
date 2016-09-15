import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./PaypalButton.jsx');
import PaypalButton from './PaypalButton.jsx';


describe('PaypalButton dumb component', () => {
  // todo: do we even need to have a test at all
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<PaypalButton />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a form', () => {
    expect(result.type).toBe('form');
  });
});
