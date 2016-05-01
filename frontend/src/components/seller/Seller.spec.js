/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./Seller.jsx');
const sellerModule = require('./Seller.jsx');
const Seller = sellerModule.Seller;

describe('Seller react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const mockSelectSeller = jasmine.createSpy('mockSelectSeller');
  const sellerComponent = <Seller name='sunny' selectSeller={mockSelectSeller} id={23}/>;
  shallowRenderer.render(sellerComponent);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('renders props.name', () => {
    expect(result.props.children).toContain('sunny');
  });

  describe('has correct propTypes', () => {
    const expectedPropTypes = [ 'name', 'selectSeller', 'id' ];
    R.forEach(
      propType => it(`has ${propType} propTypes`, () => {
        expect(R.has(propType)(Seller.propTypes)).toBe(true);
      }),
      expectedPropTypes
    );
  });
  it('should call selectSeller if clicked', () => {
    const mockBindedSelectSeller = jasmine.createSpy('boundSeller');
    mockSelectSeller.and.returnValue(mockBindedSelectSeller);
    // rerender with the new mockSeller
    shallowRenderer.render(sellerComponent);
    const result = shallowRenderer.getRenderOutput();

    expect(mockSelectSeller).toHaveBeenCalled();
    expect(mockSelectSeller).toHaveBeenCalledWith(23);
    expect(mockBindedSelectSeller).not.toHaveBeenCalled();
    result.props.onClick();
    expect(result.props.onClick).toBe(mockBindedSelectSeller);
    expect(mockBindedSelectSeller).toHaveBeenCalled();
    expect(mockBindedSelectSeller).toHaveBeenCalledWith();
  });
});

describe('Seller Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(sellerModule.default).not.toBe(Seller);
    expect(sellerModule.default.WrappedComponent).toBe(Seller);
    expect(sellerModule.default.displayName).toBe('Connect(Seller)');
  });
});
