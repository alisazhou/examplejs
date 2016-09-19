import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findInTree } from '../../testHelpers.js';
import R from 'ramda';

jest.unmock('./MenuDescription.jsx');
import MenuDescription from './MenuDescription.jsx';


const PROPS_FROM_PARENT = {
  menu: {
    id: 'abc',
    name: 'sexy menu',
    price: '200',
    chef: 'chef name',
    description: 'menu description',
    image: 'image link',
  },
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

  const innerDiv = React.Children.only(result.props.children);

  it('has an img child', () => {
    const img = R.find(R.propEq('type', 'img'))(innerDiv.props.children);
    expect(img).toBeDefined();
    expect(img.props.src).toBe('image link');
  });

  it('has a text div with left/right classes', () => {
    const textDivs = findInTree(result, 'div', { className: 'menudescription-text__div' });
    expect(textDivs.length).toEqual(1);
    const textDiv = textDivs[0];
    expect(textDiv.props.children.length).toEqual(2);
    expect(textDiv.props.children[0].props.className).toEqual('menudescription-text__left');
    expect(textDiv.props.children[1].props.className).toEqual('menudescription-text__right');
  });

  it('shows name of chef', () => {
    const chef = R.find(R.propEq('type', 'h3'))(innerDiv.props.children);
    expect(chef).toBeDefined();
    expect(chef.props.children).toBe('chef name');
  });

  it('shows a description of the menu', () => {
    const description = R.find(R.propEq('type', 'p'))(innerDiv.props.children);
    expect(description).toBeDefined();
    expect(description.props.children).toBe('menu description');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'menu' ];
    R.forEach(
      prop => expect(R.has(prop)(MenuDescription.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(MenuDescription.propTypes).length).toEqual(expectedPropTypes.length);
  });
});
