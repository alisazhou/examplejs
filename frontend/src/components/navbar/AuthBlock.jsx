import React from 'react';

import AuthButton from './AuthButton.jsx';


class AuthBlock extends React.Component {
  render() {
    const blockName = 'navbar-buttons';
    const loginBtnProps = {
      className: `${ blockName }__user-login-btn`,
      content: 'Log in',
      linkTo: '/login/',
    };
    const signupBtnProps = {
      className: `${ blockName }__user-signup-btn`,
      content: 'Sign up',
      linkTo: '/signup/',
    };

    return (
      <div className={`${ blockName }__user-div`}>
        <AuthButton {...signupBtnProps} />
        <AuthButton {...loginBtnProps} />
      </div>
    );
  }
}

export default AuthBlock;
