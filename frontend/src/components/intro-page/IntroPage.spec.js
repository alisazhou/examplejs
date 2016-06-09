/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';

jest.unmock('./IntroPage.jsx');
import IntroPage from './IntroPage.jsx';


describe('StickyBody react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<IntroPage />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  describe('Link child components', () => {
    const findLinks = result.props.children.filter(
      child => child.type === Link
    );

    it('has three Link child components', () => {
      expect(findLinks.length).toEqual(3);
    });

    it('has a link to /menus/0', () => {
      const firstLink = findLinks[0];
      expect(firstLink.props.to).toBe('/menus/0');
    });
  
    it('has a link to /menus/1', () => {
      const secondLink = findLinks[1];
      expect(secondLink.props.to).toBe('/menus/1');
    });
  
    it('has a Link component to reservation page', () => {
      const bookNowLink = findLinks[2];
      expect(bookNowLink.props.to).toEqual('/reservation');
    });
  });


});
