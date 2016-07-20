import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import '../../testHelpers.js';

jest.unmock('./PaymentPage.jsx');
import PaymentPage from './PaymentPage.jsx';
import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import PaypalButton from './PaypalButton.jsx';
import ReservationSummary from '../order-summary/MenuSummary.jsx';


describe('PaymentPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<PaymentPage />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
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
  it('has a LinkButton', () => {
    const linkBtn = R.find(R.propEq('type', LinkButton))(result.props.children);
    expect(linkBtn).toBeDefined();
    expect(linkBtn.props.content).toBe('Back');
    expect(linkBtn.props.linkTo).toBe('/reservation');
  });
  it('has a PaypalButton', () => {
    expect(result).toHaveChild(PaypalButton);
  });
});
