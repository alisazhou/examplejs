import React from 'react';
import { reduxForm, Field } from 'redux-form';

import { renderInput } from '../formHelpers.js';


const validate = values => {
  let errors = {};
  if (!values.searchDate) {
    errors.searchDate = 'Please specify a time.';
  }
  return errors;
};

class SearchDate extends React.Component {
  render () {
    return (
      <form className='searchbar-form' onSubmit={e => e.preventDefault()}>
        <Field component={renderInput}
          className={this.props.className}
          displayError={this.props.displayError}
          name='searchDate'
          type='date'
        />
      </form>
    );
  }
}

SearchDate.propTypes = {
  className: React.PropTypes.string,
  displayError: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'searchDate',
  destroyOnUnmount: false,
  initialValues: { searchDate: '' },
  validate,
})(SearchDate);

export { SearchDate };
