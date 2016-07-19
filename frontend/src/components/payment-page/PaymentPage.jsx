import React from 'react';

import MenuSummary from '../order-summary/MenuSummary.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';
import PaypalButton from './PaypalButton.jsx';
import ReservationSummary from '../order-summary/ReservationSummary.jsx';

class PaymentPage extends React.Component {
  render () {
    return (
      <div>
        <ProgressBar/>
        <p>Here are your booking details:</p>
        <ReservationSummary />
        <MenuSummary />
        <PaypalButton/>
      </div>
    );
  }
}

export default PaymentPage;
