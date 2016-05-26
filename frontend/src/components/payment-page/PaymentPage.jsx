import React from 'react';
import { connect } from 'react-redux';

import ProgressBar from '../progress-bar/ProgressBar.jsx';
import PaypalButton from './PaypalButton.jsx';

class PaymentPage extends React.Component {
  render () {
    return (
      <div>
        <ProgressBar/>
        <p>Here are your booking details:</p>
        <PaypalButton/>
      </div>
    );
  }
}

PaymentPage.propTypes = {
  currentSellerId: React.PropTypes.number.isRequired,
};

const mapStateToProps = state => ({ currentSellerId: state.currentSellerId });

export default connect(mapStateToProps, null)(PaymentPage);
export { PaymentPage };

