import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';
import { Link } from 'react-router';

jest.unmock('./AuthButton.jsx');
import AuthButton from './AuthButton.jsx';


const PROPS_FROM_PARENT = {
  linkTo: 'testLink',
  className: 'testClass',
  content: 'testContent',
};
describe('AuthButton dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<AuthButton {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a Link', () => {
    expect(result.type).toBe(Link);
    expect(result.props.to).toBe('testLink');
    expect(result.props.to).toBe('testLink');
  });

  it('has a button child component', () => {
    const btn = result.props.children;
    expect(btn.type).toBe('button');
    expect(btn.props.children).toBe('testContent');
  });

  it('has the correct propTypes', () => {
    const expectedPropTypes = [ 'className', 'content', 'linkTo' ];
    R.forEach(
      prop => expect(R.has(prop)(AuthButton.propTypes)).toBe(true),
      expectedPropTypes
    );
    expect(R.keys(AuthButton.propTypes).length).toEqual(expectedPropTypes.length);
  });
});
