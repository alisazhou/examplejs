/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import '../../testHelpers.js';
import R from 'ramda';

jest.unmock('./ReservationPage.jsx');
import ReservationPage from './ReservationPage.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
import NextButton from '../next-button/NextButton.jsx';

jest.unmock('../sticky-layout/pageMapping.js');
import { CHOICE } from '../sticky-layout/pageMapping.js';

import ReservationForm from './ReservationForm.jsx';

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a ReservationForm component', () => {
    expect(result).toHaveChild(ReservationForm);
  });
  it('has a NextButton component with the correct callback', () => {
    expect(result).toHaveChild(NextButton);
    expect(R.last(result.props.children).props.toPage).toBe(CHOICE);
  });
});
