/*eslint-env jest,jasmine */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./Footer.jsx');
import WrappedFooter, { Footer } from './Footer.jsx';
jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
import { BaseChangePageComponent } from '../sticky-layout/BaseChangePageComponent.jsx';
jest.unmock('../sticky-layout/pageMapping.js');
import { INTRO, CONTACT } from '../sticky-layout/pageMapping.js';

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
    expect(mockChangePage).toHaveBeenCalledWith(INTRO);
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
    expect(mockChangePage).toHaveBeenCalledWith(CONTACT);
  });

  it('extends BaseChangePageComponent', () => {
    expect(new Footer).toEqual(jasmine.any(BaseChangePageComponent));
  });

  it('is wrapped by a baseConnect', () => {
    expect(WrappedFooter).not.toBe(Footer);
    expect(WrappedFooter.WrappedComponent).toBe(Footer);
    expect(WrappedFooter.displayName).toBe('Connect(Footer)');
  });
});
