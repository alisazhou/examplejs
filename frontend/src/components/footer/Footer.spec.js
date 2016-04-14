/*eslint-env jest,jasmine */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// import R from 'ramda';

jest.dontMock('./Footer.jsx');
const Footer = require('./Footer.jsx').default;

describe('Footer react component', () => {
  let mockChangePage = jasmine.createSpy('mockChangePage');
  const renderedFooter = TestUtils.renderIntoDocument(<Footer changeToContactPage={mockChangePage}/>);
  it('has a link with the correct callback', () => {
    const link = TestUtils.findRenderedDOMComponentWithTag(renderedFooter, 'a');
    TestUtils.Simulate.click(link);
    expect(mockChangePage).toHaveBeenCalled();
  });
});
