import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { updateOrderActionCreator } from '../../actions/orderActions.js';


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
    } = this.props;

    return (
      <div>
        <form
          className='reservation_form'
          onSubmit={handleSubmit(this.props.updateAndMarkValid)}
        >
          <label>Name:
            <input
              type='text'
              className='reservation_form--name'
              {...customerName}
              onFocus={this.props.markInvalid}
            />
          </label>
          { customerName.touched && customerName.error &&
            <div>{customerName.error}</div> }

          <label>Mobile
            <input
              type='text'
              className='reservation_form--tel'
              {...customerTel}
              onFocus={this.props.markInvalid}
            />
          </label>
          { customerTel.touched && customerTel.error &&
            <div>{customerTel.error}</div> }

          <label>Address:
            <input
              type='text'
              className='reservation_form--add'
              {...customerAddress}
              onFocus={this.props.markInvalid}
            />
          </label>
          { customerAddress.touched && customerAddress.error &&
            <div>{customerAddress.error}</div> }

          <button type='submit'>Confirm</button>
        </form>
      </div>
    );
  }
}

ReservationForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
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
  fields,
  destroyOnUnmount: false,
  validate,
})(ConnectedForm);

export { ConnectedForm, fields, ReservationForm };
