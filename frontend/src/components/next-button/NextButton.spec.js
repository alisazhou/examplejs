/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./NextButton.jsx');
const nextButtonModule = require('./NextButton.jsx');
const NextButton = nextButtonModule.NextButton;

jest.dontMock('../sticky-layout/BaseChangePageComponent.jsx');
const BaseChangePageComponent = require('../sticky-layout/BaseChangePageComponent.jsx').BaseChangePageComponent;

describe('NextButton react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const mockChangePage = jasmine.createSpy('mockChangePage');
  shallowRenderer.render(<NextButton changePage={mockChangePage}/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to an input', () => {
    expect(result.type).toBe('input');
  });
  it('renders to an input of type button', () => {
    expect(result.props.type).toBe('button');
  });

  it('extends BaseChangePageComponent class', () => {
    expect(new NextButton).toEqual(jasmine.any(BaseChangePageComponent));
  });

});

describe('NextButton Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(nextButtonModule.default).not.toBe(NextButton);
    expect(nextButtonModule.default.WrappedComponent).toBe(NextButton);
    expect(nextButtonModule.default.displayName).toBe('Connect(NextButton)');
  });
});
