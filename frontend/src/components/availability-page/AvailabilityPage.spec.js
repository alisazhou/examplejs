/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./AvailabilityPage.jsx');
const availabilityPageModule = require('./AvailabilityPage.jsx');
const AvailabilityPage = availabilityPageModule.AvailabilityPage;
jest.dontMock('../seller/Seller.jsx');
const Seller = require('../seller/Seller.jsx').default;
jest.dontMock('../sticky-layout/BaseChangePageComponent.jsx');
const BaseChangePageComponent = require('../sticky-layout/BaseChangePageComponent.jsx').BaseChangePageComponent;
jest.dontMock('../redux-wrapper/ReduxWrapper.jsx');
const store = require('../redux-wrapper/ReduxWrapper.jsx').store;

describe('AvailabilityPage react component', () => {
  let mockChangePage = jasmine.createSpy('mockChangePage');
  let mockSellers = [];
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <AvailabilityPage changePage={mockChangePage} sellers={mockSellers}/>
  );
  const result = shallowRenderer.getRenderOutput();

  beforeEach(() => {
    // recreate the spy for each test
    mockChangePage = jasmine.createSpy('mockChangePage');
  });
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  describe('extends BaseChangePageComponent', () => {
    it('extends class', () => {
      expect(new AvailabilityPage).toEqual(jasmine.any(BaseChangePageComponent));
    });

    it('does not trample over base copy of propTypes', () => {
      expect(AvailabilityPage.propTypes).not.toBe(BaseChangePageComponent.propTypes);
    });
    const expectedPropTypes = [
      ...R.keys(BaseChangePageComponent.propTypes),
      'sellers',
    ];
    R.forEach(
      prop => it(`has propType: ${prop}`, () => {
        expect(R.has(prop)(AvailabilityPage.propTypes)).toBe(true);
      }),
      expectedPropTypes
    );
  });

  describe('deep render', () => {
    const twoSellers = [ {'name': 'john'}, {'name': 'doe'} ] ;
    const renderedPage = TestUtils.renderIntoDocument(
      <AvailabilityPage changePage={mockChangePage} sellers={twoSellers}/>
    );
    it('renders list of props.sellers components', () => {
      const SellerComponents = TestUtils.scryRenderedComponentsWithType(
        renderedPage, Seller
      );
      expect(SellerComponents.length).toBe(2);
      expect(SellerComponents[0].props.name).toBe('john');
      expect(SellerComponents[1].props.name).toBe('doe');
    });
  });

  xit('has a button input with the correct callback', () => {
    const renderedPage = TestUtils.renderIntoDocument(
      <AvailabilityPage changePage={mockChangePage}/>
    );
    const buttonInput = TestUtils.findAllInRenderedTree(
      renderedPage,
      component => (component.tagName === 'INPUT') && (component.value === 'next')
    );
    expect(buttonInput.length).toEqual(1);
    expect(mockChangePage).not.toHaveBeenCalled();
    TestUtils.Simulate.click(buttonInput[0]);
    expect(mockChangePage).toHaveBeenCalled();
    expect(mockChangePage).toHaveBeenCalledWith('choice');
  });
});

describe('AvailabilityPage Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(availabilityPageModule.default).not.toBe(AvailabilityPage);
    expect(availabilityPageModule.default.WrappedComponent).toBe(AvailabilityPage);
    expect(availabilityPageModule.default.displayName).toBe('Connect(AvailabilityPage)');
  });
  it('has a different mapStateToProps giving sellers prop', () => {
    // react will poop a warning that we need to see if there is no sellers prop
    TestUtils.renderIntoDocument(
      <availabilityPageModule.default store={store}/>
    );
    // maybe to make this better in the future, do something like
    // spyOn(console, 'warn');
    // expect(console.warn.calls.count()).toBe(0);
  });
});
