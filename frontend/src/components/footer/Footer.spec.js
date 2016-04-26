/*eslint-env jest,jasmine */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./Footer.jsx');
const footerModule = require('./Footer.jsx');
const Footer = footerModule.Footer;

describe('Footer react component', () => {
  let mockChangePage, links;
  beforeEach(() => {
    // recreate the spy for each test
    mockChangePage = jasmine.createSpy('mockChangePage');
    const renderedFooter = TestUtils.renderIntoDocument(
      <Footer changePage={mockChangePage}/>
    );
    links = TestUtils.scryRenderedDOMComponentsWithTag(renderedFooter, 'a');
  });

  it('has a return to main page link with the correct callback', () => {
    const introLinks = R.filter(
      link => link.text.indexOf('Main Page') > -1,
      links
    );
    expect(introLinks.length).toEqual(1);
    expect(mockChangePage).not.toHaveBeenCalled();
    TestUtils.Simulate.click(introLinks[0]);
    expect(mockChangePage).toHaveBeenCalled();
    expect(mockChangePage).toHaveBeenCalledWith('intro');
  });
  it('has a contact us link with the correct callback', () => {
    const contactLinks = R.filter(
      link => link.text.indexOf('Contact Us') > -1,
      links
    );
    expect(contactLinks.length).toEqual(1);
    expect(mockChangePage).not.toHaveBeenCalled();
    TestUtils.Simulate.click(contactLinks[0]);
    expect(mockChangePage).toHaveBeenCalled();
    expect(mockChangePage).toHaveBeenCalledWith('contact');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'changePage' ];
    R.forEach(
      prop => expect(R.has(prop)(Footer.propTypes)).toBe(true),
      expectedPropTypes
    );
  });
});
