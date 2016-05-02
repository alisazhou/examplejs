/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./Seller.jsx');
const sellerModule = require('./Seller.jsx');
const Seller = sellerModule.Seller;
jest.dontMock('../redux-wrapper/ReduxWrapper.jsx');
const store = require('../redux-wrapper/ReduxWrapper.jsx').store;


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
  it('should have selected css class if currentSeller state is this component', () => {
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
  it('should not have selected css class if currentSeller state is not this component', () => {
    expect(result.props.className).toBe('');
  });
});

describe('Seller Smart Component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <sellerModule.default store={store} {...PROPS_FROM_PARENT}/>
  );
  const result = shallowRenderer.getRenderOutput();
  it('is wrapped by a connect', () => {
    expect(sellerModule.default).not.toBe(Seller);
    expect(sellerModule.default.WrappedComponent).toBe(Seller);
    expect(sellerModule.default.displayName).toBe('Connect(Seller)');
  });
  it('adds a selectSeller prop', () => {
    expect(result.props.selectSeller).toBeDefined();
  });
  it('adds a currentSellerId prop', () => {
    expect(result.props.currentSellerId).toBeDefined();
  });
});
