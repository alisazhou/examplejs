import React from 'react';
import { connect } from 'react-redux';


export class ReservationSummary extends React.Component {
  render () {
    let message = 'Please specify time and address.';
    if (this.props.formData) {
      const {time, address} = this.props.formData;
      const timeValue = time ? time.value : null;
      const addressValue = address ? address.value : null;
      if (timeValue && addressValue) {
        message = `Time: ${timeValue}, Address: ${addressValue}`;
      }
    }
    return <div><p>{message}</p></div>;
  }
}

ReservationSummary.propTypes = {
  formData: React.PropTypes.shape({
    time: React.PropTypes.object.isRequired,
    address: React.PropTypes.object.isRequired,
  }),
};

const mapStateToProps = state => ({ formData: state.form.reservationForm });

export default connect(mapStateToProps)(ReservationSummary);
