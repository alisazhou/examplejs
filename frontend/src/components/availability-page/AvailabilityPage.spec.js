/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./AvailabilityPage.jsx');
const availabilityPageModule = require('./AvailabilityPage.jsx');
const AvailabilityPage = availabilityPageModule.AvailabilityPage;
jest.dontMock('../seller/Seller.jsx');
const Seller = require('../seller/Seller.jsx').default;
jest.dontMock('../redux-wrapper/ReduxWrapper.jsx');
const wrapComponent = require('../redux-wrapper/ReduxWrapper.jsx').default;
jest.dontMock('../next-button/NextButton.jsx');
const NextButton = require('../next-button/NextButton.jsx').default;
jest.dontMock('../sticky-layout/StickyLayout.jsx');
const CHOICE = require('../sticky-layout/StickyLayout.jsx').CHOICE;

describe('AvailabilityPage react component', () => {
  let mockSellers = [ {key: 1, name: '1'}, {key: 2, name: '2'} ];
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <AvailabilityPage sellers={mockSellers}/>
  );
  const result = shallowRenderer.getRenderOutput();

  beforeEach(() => {
    // recreate the spy for each test
  });
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has correct sellers propType', () => {
    expect(R.has('sellers')(AvailabilityPage.propTypes)).toBe(true);
  });
  it('has a heading thing', () => {
    expect(result.props.children[0].type).toBe('p');
  });
  it('has a list of sellers', () => {
    const firstSeller = result.props.children[1][0];
    const secondSeller = result.props.children[1][1];
    expect(firstSeller.type).toBe(Seller);
    expect(firstSeller.props.name).toBe('1');
    expect(secondSeller.type).toBe(Seller);
    expect(secondSeller.props.name).toBe('2');
  });
  it('has a NextButton component with the correct callback', () => {
    expect(result.props.children[2].type).toBe(NextButton);
    expect(result.props.children[2].props.toPage).toBe(CHOICE);
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
    const wrappedAvailabilityPage = wrapComponent(AvailabilityPage.default);
    TestUtils.renderIntoDocument(
      <wrappedAvailabilityPage/>
    );
    // maybe to make this better in the future, do something like
    // spyOn(console, 'warn');
    // expect(console.warn.calls.count()).toBe(0);
  });
});
