import React from 'react';
import { connect } from 'react-redux';


export class ReservationSummary extends React.Component {
  render () {
    let message = 'Please specify time and address.';
    if (this.props.form_data) {
      const {time, address} = this.props.form_data;
      const time_value = time ? time.value : null;
      const address_value = address ? address.value : null;
      if (time_value && address_value) {
        message = `Time: ${time_value}, Address: ${address_value}`;
      }
    }
    return <div><p>{message}</p></div>;
  }
}

const mapStateToProps = state => ({ form_data: state.form.reservationForm });

export default connect(mapStateToProps)(ReservationSummary);
