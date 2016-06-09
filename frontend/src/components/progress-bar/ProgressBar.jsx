import React from 'react';
import { Link } from 'react-router';


class ProgressBar extends React.Component {
  render () {
    return (
      <div className='progressBar'>
        <Link to='reservation' className='progressBar--part'>
          1. Booking Details
        </Link>
        <Link to='availability' className='progressBar--part'>
          2. Choose Available People
        </Link>
        <Link to='payment' className='progressBar--part'>
          3. Confirmation & Payment
        </Link>
      </div>
    );
  }
}

export default ProgressBar;
