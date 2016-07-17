import React from 'react';

import AuthButton from './AuthButton.jsx';


class AuthBlock extends React.Component {
  render () {
    const cssClassName = 'navbar--buttons--not-logged-in';
    const loginBtnProps = {
      className: `${ cssClassName }--login_btn`,
      content: 'Log in',
      linkTo: '/login/',
    };
    const signupBtnProps = {
      className: `${ cssClassName }--signup_btn`,
      content: 'Sign up',
      linkTo: '/signup/',
    };

    return (
      <div className={cssClassName}>
        <AuthButton {...signupBtnProps} />
        <AuthButton {...loginBtnProps} />
      </div>
    );
  }
}

export default AuthBlock;
