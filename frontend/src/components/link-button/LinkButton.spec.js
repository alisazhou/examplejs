import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { Link } from 'react-router';

jest.unmock('./LinkButton.jsx');
import LinkButton from './LinkButton.jsx';

const PROPS_FROM_PARENT = {
  linkTo: '/go/to/here',
  btnClassName: 'bem-y-class-name',
  content: 'insightful descriptions',
};

describe('LinkButton component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <LinkButton {...PROPS_FROM_PARENT}/>
  );
  const result = shallowRenderer.getRenderOutput();

  it('renders to a Link', () => {
    expect(result.type).toBe(Link);
  });
  it('gives correct linkTo property to Link', () => {
    expect(result.props.to).toEqual(PROPS_FROM_PARENT.linkTo);
  });
  const child = React.Children.only(result.props.children);
  it('has a single child button component', () => {
    expect(child.type).toBe('button');
  });
  it('gives correct className button child', () => {
    expect(child.props.className).toEqual(PROPS_FROM_PARENT.btnClassName);
  });
  it('gives correct text to button child', () => {
    expect(child.props.children).toEqual(PROPS_FROM_PARENT.content);
  });
  it('has the correct propTypes', () => {
  });
});
