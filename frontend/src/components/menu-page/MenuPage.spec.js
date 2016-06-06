/* eslint-env jasmine, jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./MenuPage.jsx');
import MenuPage from './MenuPage.jsx';


const PROPS_FROM_ROUTER = {
  params: { menuId: 1234 },
};
describe('MenuPage react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuPage {...PROPS_FROM_ROUTER} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('displays menu name dynamically based on id', () => {
    expect(result.props.children).toContain(1234);
  });
});
