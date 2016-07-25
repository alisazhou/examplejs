import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { updateAndValidate } from '../../actions/orderActions.js';


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
    const { customerName, customerTel, customerAddress } = this.props.fields;
    return (
      <form className='reservation_form'>
        <label>Name:
          <input
            type='text'
            className='reservation_form--name'
            {...customerName}
            onBlur={() =>this.props.updateAndValidate(customerName)}
          />
        </label>
        <label>Mobile
          <input
            type='text'
            className='reservation_form--tel'
            {...customerTel}
            onBlur={() => this.props.updateAndValidate(customerTel)}
          />
        </label>
        <label>Address:
          <input
            type='text'
            className='reservation_form--add'
            {...customerAddress}
            onBlur={() => this.props.updateAndValidate(customerAddress)}
          />
        </label>
      </form>
    );
  }
}

ReservationForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  updateAndValidate: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateAndValidate: field => dispatch(updateAndValidate(field)),
});

const ConnectedForm = connect(
  null, mapDispatchToProps
)(ReservationForm);

export default reduxForm({
  form: 'reservationForm',
  fields,
  destroyOnUnmount: false,
  validate,
})(ConnectedForm);

export { ConnectedForm, fields, ReservationForm };
