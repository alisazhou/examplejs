/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./NextButton.jsx');
import WrappedButton, { NextButton } from './NextButton.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
import { BaseChangePageComponent } from '../sticky-layout/BaseChangePageComponent.jsx';

describe('NextButton react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const mockChangePage = jasmine.createSpy('mockChangePage');
  shallowRenderer.render(
    <NextButton changePage={mockChangePage} toPage='random-page'/>
  );
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

  it('does not trample over BaseChangePageComponent copy of propTypes', () => {
    expect(NextButton.propTypes).not.toBe(BaseChangePageComponent.propTypes);
  });

  const expectedPropTypes = [
    ...R.keys(BaseChangePageComponent.propTypes),
    'toPage',
  ];
  R.forEach(
    prop => it(`has propType: ${prop}`, () => {
      expect(R.has(prop)(NextButton.propTypes)).toBe(true);
    }),
    expectedPropTypes
  );
});

describe('NextButton Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedButton).not.toBe(NextButton);
    expect(WrappedButton.WrappedComponent).toBe(NextButton);
    expect(WrappedButton.displayName).toBe('Connect(NextButton)');
  });
});
