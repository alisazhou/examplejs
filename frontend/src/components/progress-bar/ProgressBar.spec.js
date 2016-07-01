import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Link } from 'react-router';

jest.unmock('./ProgressBar.jsx');
import ProgressBar from './ProgressBar.jsx';


describe('ProgressBar react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ProgressBar/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has Link child components', () => {
    const findLinks = result.props.children.filter(
      child => child.type === Link
    );
    expect(findLinks.length).not.toEqual(0);
  });
});
