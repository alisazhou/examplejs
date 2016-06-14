/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import '../../testHelpers.js';
import R from 'ramda';

jest.unmock('./MenuDescription.jsx');
import MenuDescription from './MenuDescription.jsx';


const PROPS_FROM_PARENT = {
  chef: 'chef name',
  description: 'menu description',
  image: 'image link',
};
describe('MenuDescription dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <MenuDescription {...PROPS_FROM_PARENT} />
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('has a img child', () => {
    const img = R.find(R.propEq('type', 'img'))(result.props.children);
    expect(img).toBeDefined();
    expect(img.props.src).toBe('image link');
  });

  it('shows name of chef', () => {
    const chef = R.find(R.propEq('type', 'h3'))(result.props.children);
    expect(chef).toBeDefined();
    expect(chef.props.children).toBe('chef name');
  });

  it('shows a description of the menu', () => {
    const description = R.find(R.propEq('type', 'p'))(result.props.children);
    expect(description).toBeDefined();
    expect(description.props.children).toBe('menu description');
  });
});
