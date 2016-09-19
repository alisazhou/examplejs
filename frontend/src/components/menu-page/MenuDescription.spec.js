import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { findChildren } from '../../testHelpers.js';
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

  it('shows name of chef', () => {
    expect(
      findChildren(
        result,
        'h3', { children: 'chef name' }
      ).length
    ).toEqual(1);
  });

  it('shows a description of the menu', () => {
    expect(
      findChildren(
        result,
        'p', { children: 'menu description' }
      ).length
    ).toEqual(1);
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
