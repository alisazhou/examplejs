import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';
import '../../testHelpers.js';
import R from 'ramda';

jest.unmock('./ReservationPage.jsx');
import ReservationPage from './ReservationPage.jsx';
import MenuSummary from './MenuSummary.jsx';
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
  it('has a Link to availability page', () => {
    const link = R.find(R.propEq('type', Link))(result.props.children);
    expect(link).toBeDefined();
    expect(link.props.to).toEqual('/availability');
  });
});
