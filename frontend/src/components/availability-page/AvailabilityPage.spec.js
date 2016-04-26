/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./AvailabilityPage.jsx');
const availabilityPageModule = require('./AvailabilityPage.jsx');
const AvailabilityPage = availabilityPageModule.AvailabilityPage;
jest.dontMock('../sticky-layout/BaseChangePageComponent.jsx');
const BaseChangePageComponent = require('../sticky-layout/BaseChangePageComponent.jsx').BaseChangePageComponent;

describe('AvailabilityPage react component', () => {
  let mockChangePage = jasmine.createSpy('mockChangePage');
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<AvailabilityPage changePage={mockChangePage}/>);
  const result = shallowRenderer.getRenderOutput();

  beforeEach(() => {
    // recreate the spy for each test
    mockChangePage = jasmine.createSpy('mockChangePage');
  });
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('extends BaseChangePageComponent', () => {
    expect(new AvailabilityPage).toEqual(jasmine.any(BaseChangePageComponent));
  });

  xit('has a button input with the correct callback', () => {
    const renderedPage = TestUtils.renderIntoDocument(
      <AvailabilityPage changePage={mockChangePage}/>
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
