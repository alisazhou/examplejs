/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./Seller.jsx');
const sellerModule = require('./Seller.jsx');
const Seller = sellerModule.Seller;
jest.dontMock('../redux-wrapper/ReduxWrapper.jsx');
const wrapRedux = require('../redux-wrapper/ReduxWrapper.jsx').default;

describe('Seller react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const mockSelectSeller = jasmine.createSpy('mockSelectSeller');
  shallowRenderer.render(
    <Seller name='sunny' selectSeller={mockSelectSeller} id={23}/>
  );
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
    expect(mockSelectSeller).not.toHaveBeenCalled();
    result.props.onClick();
    expect(mockSelectSeller).toHaveBeenCalledWith(23);
  });
});

describe('Seller Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(sellerModule.default).not.toBe(Seller);
    expect(sellerModule.default.WrappedComponent).toBe(Seller);
    expect(sellerModule.default.displayName).toBe('Connect(Seller)');
  });
  it('adds a selectSeller prop', () => {
    const SellerWithStore = wrapRedux(sellerModule.default);
    // this will catch errors when coupled with required proptype (checked above)
    TestUtils.renderIntoDocument(
      <SellerWithStore name='sunny' id={23}/>
    );
  });
});
