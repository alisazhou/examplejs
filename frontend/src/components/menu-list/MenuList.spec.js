/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';

jest.unmock('./MenuList.jsx');
import MenuList from './MenuList.jsx';


describe('MenuList dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuList />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  describe('Link child components', () => {
    const findLinks = result.props.children.filter(
      child => child.type === Link
    );

    it('has two Link child components', () => {
      expect(findLinks.length).toEqual(2);
    });

    it('has a link to /menus/0', () => {
      const firstLink = findLinks[0];
      expect(firstLink.props.to).toBe('/menus/0');
    });
  
    it('has a link to /menus/1', () => {
      const secondLink = findLinks[1];
      expect(secondLink.props.to).toBe('/menus/1');
    });
  
  });
});
