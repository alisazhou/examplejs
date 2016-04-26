/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./IntroPage.jsx');
const introPageModule = require('./IntroPage.jsx');
const IntroPage = require('./IntroPage.jsx').IntroPage;
jest.dontMock('../sticky-layout/BaseChangePageComponent.jsx');
const BaseChangePageComponent = require('../sticky-layout/BaseChangePageComponent.jsx').BaseChangePageComponent;
jest.dontMock('../sticky-layout/StickyLayout.jsx');
const BOOK = require('../sticky-layout/StickyLayout.jsx').BOOK;

describe('StickyBody react component', () => {
  let mockChangePage = jasmine.createSpy('mockChangePage');
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<IntroPage changePage={mockChangePage}/>);
  const result = shallowRenderer.getRenderOutput();

  beforeEach(() => {
    // recreate the spy for each test
    mockChangePage = jasmine.createSpy('mockChangePage');
  });

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('extends BaseChangePageComponent', () => {
    expect(new IntroPage).toEqual(jasmine.any(BaseChangePageComponent));
  });
  it('is wrapped by a baseConnect', () => {
    expect(introPageModule.default).not.toBe(IntroPage);
    expect(introPageModule.default.WrappedComponent).toBe(IntroPage);
    expect(introPageModule.default.displayName).toBe('Connect(IntroPage)');
  });

  describe('with a book now button child', () => {
    const bookButton = R.find(
      element => {return element.type === 'button';},
      result.props.children
    );
    it('exists', () => {
      expect(bookButton).toBeDefined();
    });

    let renderedBookButton;
    beforeEach(() => {
      // use deeper rendering
      const renderedIntroPage = TestUtils.renderIntoDocument(
        <IntroPage changePage={mockChangePage}/>
      );
      renderedBookButton = TestUtils.findRenderedDOMComponentWithTag(
        renderedIntroPage, 'button'
      );
      // using a new mock each time, so need to click again each time
      TestUtils.Simulate.click(renderedBookButton);
    });
    it('has the correct callback function', () => {
      expect(mockChangePage).toHaveBeenCalled();
    });
    it('is only called once', () => {
      expect(mockChangePage.calls.count()).toBe(1);
    });
    it('passes the correct params', () => {
      expect(mockChangePage).toHaveBeenCalledWith(BOOK);
    });
  });
});
