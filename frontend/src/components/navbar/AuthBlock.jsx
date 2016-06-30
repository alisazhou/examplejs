import React from 'react';

import AuthButton from './AuthButton.jsx';


class AuthBlock extends React.Component {
  render () {
    const loginBtnProps = {
      className: 'login_btn',
      content: 'Log in',
      linkTo: '/login/',
    };
    const signupBtnProps = {
      className: 'signup_btn',
      content: 'Sign up',
      linkTo: '/signup/',
    };

    return (
      <div className='auth_block'>
        <AuthButton {...signupBtnProps} />
        <AuthButton {...loginBtnProps} />
      </div>
    );
  }
}

export default AuthBlock;
