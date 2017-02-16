import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { renderInput } from '../formHelpers.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


const validateRequired = value => value ? undefined : 'Required';

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
          label='Name:'
          name='customerName'
          type='text'
          validate={validateRequired}
        />
        <Field component={renderInput}
          className='reservation_form--tel'
          label='Mobile:'
          name='customerTel'
          type='text'
          validate={validateRequired}
        />
        <Field component={renderInput}
          className='reservation_form--add'
          label='Address:'
          name='customerAddress'
          type='text'
          validate={validateRequired}
        />
        <button type='submit'>Confirm</button>
      </form>
    );
  }
}

ReservationForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  updateAndMarkValid: React.PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  updateAndMarkValid: data => {
    dispatch(updateOrderActionCreator({...data}));
  },
});

const ConnectedForm = connect(
  undefined, mapDispatchToProps
)(ReservationForm);

export default reduxForm({
  form: 'reservationForm',
  destroyOnUnmount: false,
})(ConnectedForm);

export { ConnectedForm, mapDispatchToProps, ReservationForm };
