import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';

import { renderInput } from '../formHelpers.js';


class LoginForm extends React.Component {
  render() {
    return (
      <form>
        <Field component={renderInput}
          displayError={true}
          label='Email address:'
          name='loginEmail'
          type='email'
        />
        <Field component={renderInput}
          displayError={true}
          label='Password:'
          name='loginPassword'
          type='password'
        />
        <Link to='/reset/'>Forgot password?</Link>
      </form>
    );
  }
}


export default reduxForm({
  form: 'loginForm',
})(LoginForm);

export { LoginForm };
