import React from 'react';
import { connect } from 'react-redux';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import PaypalButton from './PaypalButton.jsx';
import ReservationForm from './ReservationForm.jsx';


class ReservationPage extends React.Component {
  render () {
    return (
      <div>
        <MenuSummary />
        <ReservationForm />
        <LinkButton linkTo={`/menus/${this.props.menuId}/`} content='Back' />
        <PaypalButton />
      </div>
    );
  }
}

ReservationPage.propTypes = {
  menuId: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ menuId: state.order.menuId });

export default connect(mapStateToProps)(ReservationPage);
export { ReservationPage };
