/*eslint-env jest */

import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.dontMock('./ContactPage.jsx');
const ContactPage = require('./ContactPage.jsx').default;

describe('ContactPage react component', () => {
  it('was composed with PageWrapper', () => {
    expect(ContactPage.wrappedByPageWrapper).toBe(true);
  });
  it('has a default visible property', () => {
    const renderedWithDefault = TestUtils.renderIntoDocument(<ContactPage/>);
    expect(renderedWithDefault.props.visible).toBe(true);
    const renderedWithoutDefault = TestUtils.renderIntoDocument(<ContactPage visible={false}/>);
    expect(renderedWithoutDefault.props.visible).toBe(false);
  });
  it('renders to a div with the correct css class depending on visible property', () => {
    const shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(<ContactPage visible={true}/>);
    let result = shallowRenderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.className).toEqual('');

    shallowRenderer.render(<ContactPage visible={false}/>);
    result = shallowRenderer.getRenderOutput();
    expect(result.props.className).toEqual('hidden');
  });
});
