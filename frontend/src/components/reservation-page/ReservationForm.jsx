import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { renderInput } from '../formHelpers.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


const validate = values => {
  let errors = {};
  if (!values.customerName) {
    errors.customerName = 'Please fill in your name.';
  }
  if (!values.customerAddress) {
    errors.customerAddress = 'Address is required.';
  }
  if (!values.customerTel) {
    errors.customerTel = 'Contact info is required.';
  }
  return errors;
};

class ReservationForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        className='reservation_form'
        onSubmit={handleSubmit(this.props.updateAndMarkValid)}
      >
        <Field component={renderInput}
          className='reservation_form--name'
          displayError={true}
          label='Name:'
          name='customerName'
          type='text'
          onFocus={this.props.markInvalid}
        />
        <Field component={renderInput}
          className='reservation_form--tel'
          displayError={true}
          label='Mobile:'
          name='customerTel'
          type='text'
          onFocus={this.props.markInvalid}
        />
        <Field component={renderInput}
          className='reservation_form--add'
          displayError={true}
          label='Address:'
          name='customerAddress'
          type='text'
          onFocus={this.props.markInvalid}
        />
        <button type='submit'>Confirm</button>
      </form>
    );
  }
}

ReservationForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  markInvalid: React.PropTypes.func.isRequired,
  updateAndMarkValid: React.PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  markInvalid: () => {
    dispatch(updateOrderActionCreator({orderValid: false}));
  },
  updateAndMarkValid: data => {
    dispatch(updateOrderActionCreator({...data, orderValid: true}));
  },
});

const ConnectedForm = connect(
  undefined, mapDispatchToProps
)(ReservationForm);

export default reduxForm({
  form: 'reservationForm',
  destroyOnUnmount: false,
  validate,
})(ConnectedForm);

export { ConnectedForm, mapDispatchToProps, ReservationForm };
