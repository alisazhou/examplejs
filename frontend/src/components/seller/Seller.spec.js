/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./Seller.jsx');
import WrappedSeller, { Seller } from './Seller.jsx';

jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';


const PROPS_FROM_PARENT = {
  name: 'sunny',
  id: 23,
};
const mockSelectSeller = jasmine.createSpy('mockSelectSeller');
const PROPS_FROM_REDUX = {
  selectSeller: mockSelectSeller,
  currentSellerId: 42,
};
describe('Seller react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <Seller {...PROPS_FROM_PARENT} {...PROPS_FROM_REDUX}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('renders props.name', () => {
    expect(result.props.children).toContain('sunny');
  });

  describe('has correct propTypes', () => {
    const expectedPropTypes = [ 'name', 'selectSeller', 'id', 'currentSellerId' ];
    R.forEach(
      propType => it(`has ${propType} propTypes`, () => {
        expect(R.has(propType)(Seller.propTypes)).toBe(true);
      }),
      expectedPropTypes
    );
  });
  it('should call selectSeller if clicked', () => {
    expect(mockSelectSeller).not.toHaveBeenCalled();
    result.props.onClick();
    expect(mockSelectSeller).toHaveBeenCalledWith(23);
  });
  it('should have selected css class if currentSellerId state is this component', () => {
    const newProps = R.merge(
      PROPS_FROM_REDUX,
      { currentSellerId: PROPS_FROM_PARENT.id }
    );
    shallowRenderer.render(
      <Seller {...PROPS_FROM_PARENT} {...newProps}/>
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.className).toBe('seller--selected');
  });
  it('should not have selected css class if currentSellerId state is not this component', () => {
    expect(result.props.className).toBe('');
  });
});

describe('Seller Smart Component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <WrappedSeller store={store} {...PROPS_FROM_PARENT}/>
  );
  const result = shallowRenderer.getRenderOutput();
  it('is wrapped by a connect', () => {
    expect(WrappedSeller).not.toBe(Seller);
    expect(WrappedSeller.WrappedComponent).toBe(Seller);
    expect(WrappedSeller.displayName).toBe('Connect(Seller)');
  });
  it('adds a selectSeller prop', () => {
    expect(result.props.selectSeller).toBeDefined();
  });
  it('adds a currentSellerId prop', () => {
    expect(result.props.currentSellerId).toBeDefined();
  });
});
