import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./MenuSummary.jsx');
import MenuSummary from './MenuSummary.jsx';


const PROPS_FROM_PARENT = {
  formData: {
    partySize: { value: 'partySize0' },
    dateTime: { value: 'dateTime0' },
  },
};
describe('MenuSummary dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<MenuSummary {...PROPS_FROM_PARENT}/>);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a div', () => {
    expect(result.type).toBe('div');
  });

  it('displays order attributes', () => {
    const fields = result.props.children;
    expect(fields[0].props.children).toBe('Number of guests: partySize0');
    expect(fields[1].props.children).toBe('Time: dateTime0');
  });
});
