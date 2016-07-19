import React from 'react';
import TestUtils from 'react-addons-test-utils';
import '../../testHelpers.js';

jest.unmock('./PaymentPage.jsx');
import PaymentPage from './PaymentPage.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import PaypalButton from './PaypalButton.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';
import ReservationSummary from '../order-summary/MenuSummary.jsx';


describe('PaymentPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<PaymentPage />);
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
  it('has a ReservationSummary component', () => {
    expect(result).toHaveChild(ReservationSummary);
  });
  it('has a MenuSummary component', () => {
    expect(result).toHaveChild(MenuSummary);
  });
  it('has a PaypalButton', () => {
    expect(result).toHaveChild(PaypalButton);
  });
});
