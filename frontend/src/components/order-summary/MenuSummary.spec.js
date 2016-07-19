import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./MenuSummary.jsx');
import WrappedSummary, { MenuSummary } from './MenuSummary.jsx';


const PROPS_FROM_REDUX = {
  menuName: 'menu0',
  partySize: 'partySize0',
  dateTime: 'dateTime0',
};
describe('MenuSummary dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuSummary {...PROPS_FROM_REDUX}/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('displays order attributes', () => {
    const fields = result.props.children;
    expect(fields[0].props.children).toBe('Menu: menu0');
    expect(fields[1].props.children).toBe('Number of guests: partySize0');
    expect(fields[2].props.children).toBe('Time: dateTime0');
  });
});


describe('MenuSummary smart component', () => {
  it('is wrapped by a connect', () => {
    expect(WrappedSummary).not.toBe(MenuSummary);
    expect(WrappedSummary.WrappedComponent).toBe(MenuSummary);
    expect(WrappedSummary.displayName).toBe('Connect(MenuSummary)');
  });
});
