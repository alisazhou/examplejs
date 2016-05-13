import React from 'react';
import NextButton from '../next-button/NextButton.jsx';
import { CHOICE } from '../sticky-layout/StickyLayout.jsx';

class ReservationPage extends React.Component {
  render () {
    return (
      <div>
        <p>Customize your Reservation Details</p>
        <label>Name:
          <input
            type='text'
            name='name'
            className='reservation_detail'
          />
        </label>
        <label>Mobile:
          <input
            type='text'
            name='tel'
            className='reservation_detail'
          />
        </label>
        <label>Address:
          <input
            type='text'
            name='address'
            className='reservation_detail'
          />
        </label>
        <label>Preferred time:
          <input
            type='text'
            name='time'
            className='reservation_detail'
          />
        </label>
        <NextButton toPage={CHOICE}/>
      </div>
    );
  }
}

export default ReservationPage;
