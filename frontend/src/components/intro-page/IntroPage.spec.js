/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./IntroPage.jsx');
const introPageModule = require('./IntroPage.jsx');
const IntroPage = require('./IntroPage.jsx').IntroPage;

describe('StickyBody react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  const mockChangePage = jasmine.createSpy('mockChangePage');
  shallowRenderer.render(<IntroPage changePage={mockChangePage}/>);
  const result = shallowRenderer.getRenderOutput();
  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'changePage' ];
    R.forEach(
      prop => expect(R.has(prop)(IntroPage.propTypes)).toBe(true),
      expectedPropTypes
    );
  });

  it('is wrapped by a redux connect', () => {
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

    // use deeper rendering
    const mockChangePage = jasmine.createSpy('mockChangePage');
    const renderedIntroPage = TestUtils.renderIntoDocument(
      <IntroPage changePage={mockChangePage}/>
    );
    const renderedBookButton = TestUtils.findRenderedDOMComponentWithTag(
      renderedIntroPage, 'button'
    );
    TestUtils.Simulate.click(renderedBookButton);
    it('has the correct callback function', () => {
      expect(mockChangePage).toHaveBeenCalled();
    });
    it('is only called once', () => {
      expect(mockChangePage.calls.count()).toBe(1);
    });
    it('passes the correct params', () => {
      expect(mockChangePage).toHaveBeenCalledWith('book');
    });
  });
});
