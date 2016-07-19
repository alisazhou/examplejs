import React from 'react';
import TestUtils from 'react-addons-test-utils';
import '../../testHelpers.js';
import R from 'ramda';

jest.unmock('./ReservationPage.jsx');
import ReservationPage from './ReservationPage.jsx';
import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';
import ReservationForm from './ReservationForm.jsx';

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has a MenuSummary component', () => {
    expect(result).toHaveChild(MenuSummary);
  });
  it('has a ProgressBar component', () => {
    expect(result).toHaveChild(ProgressBar);
  });
  it('has a ReservationForm component', () => {
    expect(result).toHaveChild(ReservationForm);
  });
  it('has a LinkButton to payment page', () => {
    const linkBtn = R.find(R.propEq('type', LinkButton))(result.props.children);
    expect(linkBtn).toBeDefined();
    expect(linkBtn.props.linkTo).toBe('/payment');
  });
});
