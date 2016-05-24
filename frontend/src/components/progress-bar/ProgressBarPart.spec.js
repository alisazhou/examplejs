/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./ProgressBarPart.jsx');
import WrappedPart, { ProgressBarPart } from './ProgressBarPart.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
import { BaseChangePageComponent } from '../sticky-layout/BaseChangePageComponent.jsx';

const mockChangePage = jasmine.createSpy('mockChangePage');

const PROPS_FROM_PARENT = { page: 'some page' };
const PROPS_FROM_REDUX = { changePage: mockChangePage };

describe('ProgressBarPart react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ProgressBarPart {...PROPS_FROM_PARENT} {...PROPS_FROM_REDUX}/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('displays props.page as text', () => {
    expect(result.props.children).toBe('some page');
  });

  it('extends BaseChangePageComponent class', () => {
    expect(new ProgressBarPart).toEqual(jasmine.any(BaseChangePageComponent));
  });

  it('does not trample over BaseChangePageComponent copy of propTypes', () => {
    expect(ProgressBarPart.propTypes).not.toBe(BaseChangePageComponent.propTypes);
  });

  const expectedPropTypes = [
    ...R.keys(BaseChangePageComponent.propTypes),
    'page',
  ];
  R.forEach(
    prop => it(`has propType: ${prop}`, () => {
      expect(R.has(prop)(ProgressBarPart.propTypes)).toBe(true);
    }),
    expectedPropTypes
  );
});

describe('ProgressBarPart Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPart).not.toBe(ProgressBarPart);
    expect(WrappedPart.WrappedComponent).toBe(ProgressBarPart);
    expect(WrappedPart.displayName).toBe('Connect(ProgressBarPart)');
  });
});
