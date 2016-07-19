import React from 'react';
import { connect } from 'react-redux';


class ReservationSummary extends React.Component {
  render () {
    return (
      <div>
        <p>{`Name: ${this.props.customerName}`}</p>
        <p>{`Address: ${this.props.customerAdd}`}</p>
        <p>{`Phone: ${this.props.customerTel}`}</p>
      </div>
    );
  }
}

ReservationSummary.propTypes = {
  customerAdd: React.PropTypes.string.isRequired,
  customerName: React.PropTypes.string.isRequired,
  customerTel: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  customerAdd: state.order.customerAdd || '',
  customerName: state.order.customerName || '',
  customerTel: state.order.customerTel || '',
});

export default connect(mapStateToProps)(ReservationSummary);
export { ReservationSummary };
