import React from 'react';

class ReservationPage extends React.Component {
  render () {
    return (
      <div>
        <p>Customize your Reservation Details</p>
        Address: <input name='address'/>
        <input type='button' value='next'/>
      </div>
    );
  }
}
ReservationPage.propTypes = {
  changePage: React.PropTypes.func.isRequired,
};

export default ReservationPage;
