import React from 'react';
import { connect } from 'react-redux';

import partySizeOptions from './orderAttributesConstants.js';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


class OrderAttributes extends React.Component {
  render () {
    return (
      <form className='menu_page--attributes'>
        <label>How many guests?
          <select
            value={this.props.partySize}
            onChange={e => this.props.updateOrder({partySize: e.target.value})}>
          {partySizeOptions.map(size =>
            <option key={size.value} value={size.label}>{size.label}</option>
          )}
          </select>
        </label>
        <label>When's the party?
          <input
            placeholder='Fri 8pm'
            value={this.props.dateTime}
            onChange={e => this.props.updateOrder({dateTime: e.target.value})} />
        </label>
      </form>
    );
  }
}

OrderAttributes.propTypes = {
  dateTime: React.PropTypes.string.isRequired,
  partySize: React.PropTypes.string.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dateTime: state.order.dateTime || '',
  partySize: state.order.partySize || '',
});

const mapDispatchToProps = dispatch => ({
  updateOrder: update => { dispatch(updateOrderActionCreator(update)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderAttributes);
export { OrderAttributes };
