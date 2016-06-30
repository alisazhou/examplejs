import React from 'react';

import AuthButton from './AuthButton.jsx';


class ProfileButton extends React.Component {
  render () {
    const profileBtnProps = {
      className: 'profile_btn',
      content: 'TODO: user pic',
      linkTo: '/account/',
    };
    return (
      <AuthButton {...profileBtnProps} />
    );
  }
}

export default ProfileButton;
