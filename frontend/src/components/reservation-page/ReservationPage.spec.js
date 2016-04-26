/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./ReservationPage.jsx');
const reservationPageModule = require('./ReservationPage.jsx');
const ReservationPage = reservationPageModule.ReservationPage;
jest.dontMock('../sticky-layout/BaseChangePageComponent.jsx');
const BaseChangePageComponent = require('../sticky-layout/BaseChangePageComponent.jsx').BaseChangePageComponent;

describe('ReservationPage react component', () => {
  let mockChangePage = jasmine.createSpy('mockChangePage');
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReservationPage changePage={mockChangePage}/>);
  const result = shallowRenderer.getRenderOutput();

  beforeEach(() => {
    // recreate the spy for each test
    mockChangePage = jasmine.createSpy('mockChangePage');
  });

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('extends BaseChangePageComponent', () => {
    expect(new ReservationPage).toEqual(jasmine.any(BaseChangePageComponent));
  });
  it('is wrapped by a baseConnect', () => {
    expect(reservationPageModule.default).not.toBe(ReservationPage);
    expect(reservationPageModule.default.WrappedComponent).toBe(ReservationPage);
    expect(reservationPageModule.default.displayName).toBe('Connect(ReservationPage)');
  });

  it('has a button input with the correct callback', () => {
    const renderedPage = TestUtils.renderIntoDocument(
      <ReservationPage changePage={mockChangePage}/>
    );
    const buttonInput = TestUtils.findAllInRenderedTree(
      renderedPage,
      component => (component.tagName === 'INPUT') && (component.value === 'next')
    );
    expect(buttonInput.length).toEqual(1);
    expect(mockChangePage).not.toHaveBeenCalled();
    TestUtils.Simulate.click(buttonInput[0]);
    expect(mockChangePage).toHaveBeenCalled();
    expect(mockChangePage).toHaveBeenCalledWith('choice');
  });
});
