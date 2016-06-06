/* eslint-env jasmine, jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./MenuDetails.jsx');
import MenuDetails from './MenuDetails.jsx';


const PROPS_FROM_PARENT= {
  params: { menuId: 1234 },
};
describe('MenuDetails react component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuDetails {...PROPS_FROM_PARENT} />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('displays menu name dynamically based on id', () => {
    expect(result.props.children).toContain(1234);
  });
});
