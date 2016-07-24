import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import R from 'ramda';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuDescription from './MenuDescription.jsx';
import OrderAttributes from './OrderAttributes.jsx';
import {
  updateOrderActionCreator,
  validateOrderActionCreator,
} from '../../actions/orderActions.js';


class MenuPage extends React.Component {
  render () {
    const onNextClick = () => {
      this.props.updateOrderMenu(this.props.params.menuId);
      const pageValid = this.props.dateTimeValidated === true &&
        this.props.partySizeValidated === true;
      if (pageValid) {
        browserHistory.push('/reservation');
      }
      if (this.props.dateTimeValidated === undefined) {
        this.props.markAsInvalid('dateTime');
      }
      if (this.props.partySizeValidated === undefined) {
        this.props.markAsInvalid('partySize');
      }
    };
    return (
      <div>
        <h1>{this.props.menu.name}</h1>
        <MenuDescription {...this.props.menu}/>
        <OrderAttributes />
        <LinkButton linkTo='/' content='Back' />
        <button onClick={onNextClick}>Next</button>
      </div>
    );
  }
}

MenuPage.propTypes = {
  dateTimeValidated: React.PropTypes.bool,
  menu: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  markAsInvalid: React.PropTypes.func.isRequired,
  params: React.PropTypes.shape({
    menuId: React.PropTypes.string.isRequired,
  }),
  partySizeValidated: React.PropTypes.bool,
  updateOrderMenu: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  menu: R.find(R.propEq('id', ownProps.params.menuId))(state.menus),
  dateTimeValidated: state.order.dateTimeValidated,
  partySizeValidated: state.order.partySizeValidated,
});

const mapDispatchToProps = dispatch => ({
  updateOrderMenu: menuId => dispatch(updateOrderActionCreator({menuId})),
  markAsInvalid: fieldName =>
    dispatch(validateOrderActionCreator(fieldName, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
export { MenuPage };
