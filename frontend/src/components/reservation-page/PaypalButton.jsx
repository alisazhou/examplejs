import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import { fields } from './ReservationForm.jsx';
import { validateAndFindUntouched } from '../formHelpers.js';
import { validateOrderActionCreator } from '../../actions/orderActions.js';

class PaypalButton extends React.Component {
  render () {
    const onNextClick = e => {
      const untouched = validateAndFindUntouched(e, this.props.fieldsStatus);
      R.map(fieldName => this.props.markInvalid(fieldName), untouched);
    };
    return (
      <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
        <input type='hidden' name='cmd' value='_s-xclick'/>
        <input type='hidden' name='hosted_button_id' value='ZJN9C7BSSXNDW'/>
        <input
          type='image'
          src='https://www.paypalobjects.com/en_GB/HK/i/btn/btn_buynowCC_LG_wCUP.gif'
          border='0' name='submit' alt='PayPal – The safer, easier way to pay online.'
          onClick={e => onNextClick(e)}
        />
        <img alt='' border='0' src='https://www.paypalobjects.com/en_GB/i/scr/pixel.gif' width='1' height='1'/>
      </form>
    );
  }
}

PaypalButton.propTypes = {
  fieldsStatus: React.PropTypes.object.isRequired,
  markInvalid: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fieldsStatus: R.pickAll(
    R.map(field => `${field}Validated`, fields),
    state.order
  ),
});

const mapDispatchToProps = dispatch => ({
  markInvalid: fieldName =>
    dispatch(validateOrderActionCreator(fieldName, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaypalButton);
export { mapStateToProps, PaypalButton };
