import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import R from 'ramda';

import { updateOrderActionCreator } from '../../actions/orderActions.js';
import PaypalButton from './PaypalButton.jsx';


const fields = [ 'customerName', 'customerTel', 'customerAddress' ];

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
  render () {
    const {
      fields: { customerName, customerTel, customerAddress },
      handleSubmit,
      valid: formValid,
    } = this.props;

    return (
      <div>
        <form
          className='reservation_form'
          onSubmit={handleSubmit(this.props.updateOrder)}
        >
          <label>Name:
            <input
              type='text'
              className='reservation_form--name'
              {...customerName}
            />
          </label>
          { customerName.touched && customerName.error &&
            <div>{customerName.error}</div> }

          <label>Mobile
            <input
              type='text'
              className='reservation_form--tel'
              {...customerTel}
            />
          </label>
          { customerTel.touched && customerTel.error &&
            <div>{customerTel.error}</div> }

          <label>Address:
            <input
              type='text'
              className='reservation_form--add'
              {...customerAddress}
            />
          </label>
          { customerAddress.touched && customerAddress.error &&
            <div>{customerAddress.error}</div> }

          <button type='submit'>Confirm</button>
        </form>

        { formValid && <PaypalButton /> }
      </div>
    );
  }
}

ReservationForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
  valid: React.PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateOrder: R.compose(dispatch, updateOrderActionCreator),
});

const ConnectedForm = connect(
  undefined, mapDispatchToProps
)(ReservationForm);

export default reduxForm({
  form: 'reservationForm',
  fields,
  destroyOnUnmount: false,
  validate,
})(ConnectedForm);

export { ConnectedForm, fields, ReservationForm };
