import React from 'react';
import { connect } from 'react-redux';

import { updateOrderActionCreator } from '../../actions/orderActions.js';


class ReservationForm extends React.Component {
  render () {
    return (
      <form className='reservation_form'>
        <label>Name:
          <input
            type='text'
            className='reservation_form--name'
            onChange={e => this.props.updateOrder({customerName: e.target.value})}
            value={this.props.customerName} />
        </label>
        <label>Mobile:
          <input
            type='text'
            className='reservation_form--tel'
            onChange={e => this.props.updateOrder({customerTel: e.target.value})}
            value={this.props.customerTel} />
        </label>
        <label>Address:
          <input
            type='text'
            className='reservation_form--add'
            onChange={e => this.props.updateOrder({customerAdd: e.target.value})}
            value={this.props.customerAdd} />
        </label>
      </form>
    );
  }
}

ReservationForm.propTypes = {
  customerAdd: React.PropTypes.string.isRequired,
  customerName: React.PropTypes.string.isRequired,
  customerTel: React.PropTypes.string.isRequired,
  updateOrder: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customerName: state.order.customerName || '',
  customerAdd: state.order.customerAdd || '',
  customerTel: state.order.customerTel || '',
});

const mapDispatchToProps = dispatch => ({
  updateOrder: update => { dispatch(updateOrderActionCreator(update));},
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);

export { ReservationForm };
