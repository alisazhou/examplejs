/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./ReservationPage.jsx');
const ReservationPage = require('./ReservationPage.jsx').default;
jest.dontMock('../sticky-layout/StickyLayout.jsx');
// const CHOICE = require('../sticky-layout/StickyLayout.jsx').CHOICE;
jest.dontMock('../next-button/NextButton.jsx');
const NextButton = require('../next-button/NextButton.jsx').default;

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has a NextButton component with the correct callback', () => {
    expect(result.props.children[3].type).toBe(NextButton);
    // expect(mockChangePage).toHaveBeenCalledWith(CHOICE);
  });
});
