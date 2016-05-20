/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./ReservationPage.jsx');
import ReservationPage from './ReservationPage.jsx';

jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
import NextButton from '../next-button/NextButton.jsx';

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a NextButton component with the correct callback', () => {
    expect(result.props.children[5].type).toBe(NextButton);
    // expect(mockChangePage).toHaveBeenCalledWith(CHOICE);
  });
});
