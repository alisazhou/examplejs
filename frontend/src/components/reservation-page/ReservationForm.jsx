import React from 'react';
import { reduxForm } from 'redux-form';
export const fields = [ 'name', 'tel', 'address', 'time' ];


class ReservationForm extends React.Component {
  render () {
    const {
      fields: {name, tel, address, time},
      handleSubmit
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <p>Customize your Reservation Details</p>
        <label>Name:
          <input
            type='text'
            className='reservation_detail'
            {...name}
          />
        </label>
        <label>Mobile:
          <input
            type='text'
            className='reservation_detail'
            {...tel}
          />
        </label>
        <label>Address:
          <input
            type='text'
            className='reservation_detail'
            {...address}
          />
        </label>
        <label>Preferred time:
          <input
            type='text'
            className='reservation_detail'
            {...time}
          />
        </label>
      </form>
    );
  }
};

export default reduxForm({
  form: "reservationForm",
  fields, 
})(ReservationForm);
