/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import '../../testHelpers.js';

jest.unmock('./PaymentPage.jsx');
import WrappedPage, { PaymentPage } from './PaymentPage.jsx';

jest.unmock('../seller/sellersReducer.js');
jest.unmock('../seller/currentSellerIdReducer.js');
jest.unmock('../sticky-layout/currentPageReducer.js');
jest.unmock('../redux-wrapper/ReduxWrapper.jsx');
import { store } from '../redux-wrapper/ReduxWrapper.jsx';

import PaypalButton from './PaypalButton.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';

const PROPS_FROM_REDUX = {currentSellerId: 1};
describe('PaymentPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <PaymentPage {...PROPS_FROM_REDUX}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has a ProgressBar component', () => {
    expect(result).toHaveChild(ProgressBar);
  });
  it('has a confirmation of booking details', () => {
    expect(result).toHaveChild('p');
  });
  it('has a PaypalButton', () => {
    expect(result).toHaveChild(PaypalButton);
  });
});

describe('PaymentPage Smart Component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedPage).not.toBe(PaymentPage);
    expect(WrappedPage.WrappedComponent).toBe(PaymentPage);
    expect(WrappedPage.displayName).toBe('Connect(PaymentPage)');
  });
  it('has a mapStateToProps that gives currentSellerId prop', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <WrappedPage store={store}/>
    );
    const result = shallowRenderer.getRenderOutput();
    expect(result.props.currentSellerId).toBeDefined();
  });

});
