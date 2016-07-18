import React from 'react';
import { reduxForm } from 'redux-form';

const fields = [ 'name', 'tel', 'address', 'time' ];


class ReservationForm extends React.Component {
  render () {
    const { name, tel, address } = this.props.fields;
    return (
      <form className='reservation_form'>
        <label>Name:
          <input
            type='text'
            className='reservation_form--name'
            {...name}
          />
        </label>
        <label>Mobile:
          <input
            type='text'
            className='reservation_form--tel'
            {...tel}
          />
        </label>
        <label>Address:
          <input
            type='text'
            className='reservation_form--add'
            {...address}
          />
        </label>
      </form>
    );
  }
}

ReservationForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'reservationForm',
  fields,
  destroyOnUnmount: false,
})(ReservationForm);

export { fields, ReservationForm };
