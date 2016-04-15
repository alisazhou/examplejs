/*eslint-env jest,jasmine */

import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.dontMock('./Footer.jsx');
const Footer = require('./Footer.jsx').default;

describe('Footer react component', () => {
  let mockChangeToContact = jasmine.createSpy('mockChangeToContact');
  let mockChangeToIntro = jasmine.createSpy('mockChangeToIntro');
  const renderedFooter = TestUtils.renderIntoDocument(
    <Footer changeToContactPage={mockChangeToContact} changeToIntroPage={mockChangeToIntro}/>
  );
  const links = TestUtils.scryRenderedDOMComponentsWithTag(renderedFooter, 'a');

  it('has a contact us link with the correct callback', () => {
    const contactLinks = R.filter(
      link => link.text.indexOf('Contact Us') > -1,
      links
    );
    expect(contactLinks.length).toEqual(1);
    TestUtils.Simulate.click(contactLinks[0]);
    expect(mockChangeToContact).toHaveBeenCalled();
  });
  it('has a return to main page link with the correct callback', () => {
    const introLinks = R.filter(
      link => link.text.indexOf('Main Page') > -1,
      links
    );
    expect(introLinks.length).toEqual(1);
    TestUtils.Simulate.click(introLinks[0]);
    expect(mockChangeToIntro).toHaveBeenCalled();
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'changeToContactPage', 'changeToIntroPage' ];
    R.forEach(
      prop => expect(R.has(prop)(Footer.propTypes)).toBe(true),
      expectedPropTypes
    );
  });
});
