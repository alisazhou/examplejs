/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./ReservationPage.jsx');
import ReservationPage from './ReservationPage.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
import NextButton from '../next-button/NextButton.jsx';
import ReservationForm from './ReservationForm.jsx';

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a ReservationForm component', () => {
    const findReservationForm = result.props.children.filter(
      child => child.type === ReservationForm
    );
    expect(findReservationForm.length).toEqual(1);
  });

  it('has a NextButton component with the correct callback', () => {
    const findNextButton = result.props.children.filter(
      child => child.type === NextButton
    );
    expect(findNextButton.length).toEqual(1);
    // expect(mockChangePage).toHaveBeenCalledWith(CHOICE);
  });
});
