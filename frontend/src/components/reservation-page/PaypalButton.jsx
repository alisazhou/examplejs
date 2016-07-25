import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import { onNextClick } from '../formHelpers.js';
import { fields } from './ReservationForm.jsx';


class PaypalButton extends React.Component {
  render () {
    return (
      <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
        <input type='hidden' name='cmd' value='_s-xclick'/>
        <input type='hidden' name='hosted_button_id' value='ZJN9C7BSSXNDW'/>
        <input
          type='image'
          src='https://www.paypalobjects.com/en_GB/HK/i/btn/btn_buynowCC_LG_wCUP.gif'
          border='0' name='submit' alt='PayPal – The safer, easier way to pay online.'
          onClick={e => onNextClick(e, this.props.fieldsStatus, fields.length)}
        />
        <img alt='' border='0' src='https://www.paypalobjects.com/en_GB/i/scr/pixel.gif' width='1' height='1'/>
      </form>
    );
  }
}

PaypalButton.propTypes = {
  fieldsStatus: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  fieldsStatus: R.pick(R.map(field => `${field}Validated`, fields), state.order),
});

export default connect(mapStateToProps)(PaypalButton);
export { mapStateToProps, PaypalButton };
