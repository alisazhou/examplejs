/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./ReservationPage.jsx');
const reservationPageModule = require('./ReservationPage.jsx');
const ReservationPage = reservationPageModule.ReservationPage;

describe('ReservationPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const mockChangePage = jasmine.createSpy('mockChangePage');
  shallowRenderer.render(<ReservationPage changePage={mockChangePage}/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'changePage' ];
    R.forEach(
      prop => expect(R.has(prop)(ReservationPage.propTypes)).toBe(true),
      expectedPropTypes
    );
  });
  it('is wrapped by a redux connect', () => {
    expect(reservationPageModule.default).not.toBe(ReservationPage);
    expect(reservationPageModule.default.WrappedComponent).toBe(ReservationPage);
    expect(reservationPageModule.default.displayName).toBe('Connect(ReservationPage)');
  });

  it('has a button input with the correct callback', () => {
    const mockChangePage2 = jasmine.createSpy('mockChangePage');
    const renderedPage = TestUtils.renderIntoDocument(
      <ReservationPage changePage={mockChangePage2}/>
    );
    const buttonInput = TestUtils.findAllInRenderedTree(
      renderedPage,
      component => (component.tagName === 'INPUT') && (component.value === 'next')
    );
    expect(buttonInput.length).toEqual(1);
    expect(mockChangePage2).not.toHaveBeenCalled();
    TestUtils.Simulate.click(buttonInput[0]);
    expect(mockChangePage2).toHaveBeenCalled();
    expect(mockChangePage2).toHaveBeenCalledWith('choice');
  });
});
