import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import R from 'ramda';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuDescription from './MenuDescription.jsx';
import OrderAttributes from './OrderAttributes.jsx';
import { updateOrderActionCreator } from '../../actions/orderActions.js';


class MenuPage extends React.Component {
  render () {
    const onNextClick = () => {
      this.props.updateOrderMenu(this.props.params.menuId);
      if (this.props.pageValid) {
        browserHistory.push('/reservation');
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
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
    chef: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
  }),
  pageValid: React.PropTypes.bool.isRequired,
  params: React.PropTypes.shape({
    menuId: React.PropTypes.string.isRequired,
  }),
  updateOrderMenu: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  menu: R.find(R.propEq('id', ownProps.params.menuId))(state.menus),
  pageValid: (state.order.dateTimeValidated === true) &&
    (state.order.partySizeValidated === true),
});

const mapDispatchToProps = dispatch => ({
  updateOrderMenu: menuId => dispatch(updateOrderActionCreator({menuId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
export { MenuPage };
