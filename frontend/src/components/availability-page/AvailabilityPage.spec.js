/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

import '../../testHelpers.js';

jest.unmock('./AvailabilityPage.jsx');
import WrappedPage, { AvailabilityPage } from './AvailabilityPage.jsx';

jest.unmock('../sticky-layout/pageMapping.js');
import { CONFIRM } from '../sticky-layout/pageMapping.js';

jest.unmock('../seller/sellersReducer.js');
jest.unmock('../seller/currentSellerIdReducer.js');
import Seller from '../seller/Seller.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent');
import NextButton from '../next-button/NextButton.jsx';

jest.unmock('../sticky-layout/currentPageReducer.js');
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';

jest.unmock('../progress-bar/ProgressBar.jsx');
import ProgressBar from '../progress-bar/ProgressBar.jsx';

jest.unmock('../reservation-summary/ReservationSummary.jsx');

describe('AvailabilityPage react component', () => {
  let mockSellers = [ {key: 1, name: '1'}, {key: 2, name: '2'} ];
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <AvailabilityPage sellers={mockSellers}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has a ProgressBar component', () => {
    expect(result).toHaveChild(ProgressBar);
  });
  it('has correct sellers propType', () => {
    expect(R.has('sellers')(AvailabilityPage.propTypes)).toBe(true);
  });
  it('has a heading thing', () => {
    expect(result).toHaveChild('p');
  });
  it('has a list of sellers', () => {
    const firstSeller = result.props.children[3][0];
    const secondSeller = result.props.children[3][1];
    expect(firstSeller.type).toBe(Seller);
    expect(firstSeller.props.name).toBe('1');
    expect(secondSeller.type).toBe(Seller);
    expect(secondSeller.props.name).toBe('2');
  });
  it('has a NextButton component', () => {
    expect(result).toHaveChild(NextButton);
  });
  it('has a NextButton component with the correct callback', () => {
    expect(result.props.children[4].props.toPage).toBe(CONFIRM);
  });
});

describe('AvailabilityPage Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(AvailabilityPage);
    expect(WrappedPage.WrappedComponent).toBe(AvailabilityPage);
    expect(WrappedPage.displayName).toBe('Connect(AvailabilityPage)');
  });
  it('has a mapStateToProps that gives sellers prop', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedPage store={store}/>
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.sellers).toBeDefined();
  });

});
