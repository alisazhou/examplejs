/*eslint-env jest,jasmine */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import R from 'ramda';

jest.unmock('./ProgressBar.jsx');
import ProgressBar from './ProgressBar.jsx';


jest.unmock('../sticky-layout/BaseChangePageComponent.jsx');
jest.unmock('./ProgressBarPart.jsx');
import ProgressBarPart from './ProgressBarPart.jsx';
jest.unmock('../sticky-layout/pageMapping.js');
import { BOOK, CHOICE, CONFIRM } from '../sticky-layout/pageMapping.js';

describe('ProgressBar react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ProgressBar/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });
  it('has 3 children', () => {
    expect(React.Children.count(result.props.children)).toBe(3);
  });
  it('has children of type ProgressBarPart', () => {
    R.forEach(
      child => { expect(child.type).toBe(ProgressBarPart); },
      result.props.children
    );
  });
  it('has children with the correct page prop', () => {
    const expectedPagePropValue = [
      BOOK, CHOICE, CONFIRM,
    ];
    R.forEach(
      ([ child, pageValue ]) => {
        expect(child.props.page).toBe(pageValue);
      },
      R.zip(result.props.children, expectedPagePropValue)
    );
  });
});
