/* eslint-env jest */
import React from 'react';
import TestUtils from 'react-addons-test-utils';

jest.unmock('./ProfileButton.jsx');
import ProfileButton from './ProfileButton.jsx';
import AuthButton from './AuthButton.jsx';


describe('ProfileButton dumb component', () => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ProfileButton />);
  const result = shallowRenderer.getRenderOutput();

  it('renders to a AuthButton', () => {
    expect(result.type).toBe(AuthButton);
  });

  it('is for user profile', () => {
    expect(result.props.linkTo).toBe('/account/');
    expect(result.props.className).toBe('profile_btn');
  });
});
