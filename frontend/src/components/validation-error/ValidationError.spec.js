import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./ValidationError.jsx');
import ValidationError from './ValidationError.jsx';


const PROPS_FROM_PARENT_INVALID = {
  invalid: true, error: 'error invalid',
};
const PROPS_FROM_PARENT_VALID = {
  invalid: false, error: 'error valid',
};

describe('ValidationError dumb component', () => {
  describe('when page is valid', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ValidationError {...PROPS_FROM_PARENT_VALID} />);
    const validResult = shallowRenderer.getRenderOutput();

    it('renders to a div', () => {
      expect(validResult.type).toBe('div');
    });

    it('shows no error msg', () => {
      expect(validResult.props.children).toBe('');
    });
  });

  describe('when page is invalid', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ValidationError {...PROPS_FROM_PARENT_INVALID} />);
    const invalidResult = shallowRenderer.getRenderOutput();

    it('renders to a div', () => {
      expect(invalidResult.type).toBe('div');
    });

    it('shows error msg', () => {
      expect(invalidResult.props.children).toBe('error invalid');
    });
  });
});
