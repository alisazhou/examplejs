import React from 'react';
import NextButton from '../next-button/NextButton.jsx';
import { CHOICE } from '../sticky-layout/StickyLayout.jsx';

class ReservationPage extends React.Component {
  render () {
    return (
      <div>
        <p>Customize your Reservation Details</p>
        Address: <input name='address'/>
        <NextButton toPage={CHOICE}/>
      </div>
    );
  }
}

export default ReservationPage;
