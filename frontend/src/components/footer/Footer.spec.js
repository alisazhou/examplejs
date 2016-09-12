import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';

jest.unmock('./Footer.jsx');
import Footer from './Footer.jsx';


describe('Footer react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<Footer />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  describe('Link child components', () => {
    const links = result.props.children.filter(
      child => child.type === Link
    );

    it('there are two Link components', () => {
      expect(links.length).toEqual(2);
    });
    
    it('first Link to root url', () => {
      const firstLink = links[0];
      expect(firstLink.props.to).toBe('/');
    });

    it('second Link to contact us', () => {
      const secondLink = links[1];
      expect(secondLink.props.to).toBe('/contact/');
    });
  });


});
