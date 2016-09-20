import React from 'react';
import { reduxForm, Field } from 'redux-form';

import partySizeOptions from './orderAttributesConstants.js';
import { renderSelect } from '../formHelpers.js';


const validate = values => {
  let errors = {};
  if (!values.searchSize || values.searchSize === 'Number of guests') {
    errors.searchSize = 'Please select the number of guests.';
  }
  return errors;
};

class SearchSize extends React.Component {
  render () {
    return (
      <form className='searchbar-form'>
        <Field component={renderSelect}
          className={this.props.className}
          displayError={this.props.displayError}
          name='searchSize'
          options={partySizeOptions}
        />
      </form>
    );
  }
}

SearchSize.propTypes = {
  className: React.PropTypes.string,
  displayError: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'searchSize',
  destroyOnUnmount: false,
  initialValues: { searchSize: '' },
  validate,
})(SearchSize);

export { SearchSize };
