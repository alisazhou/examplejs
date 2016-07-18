import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuDescription from './MenuDescription.jsx';
import OrderAttributes from './OrderAttributes.jsx';
import { updateOrderActionCreator } from '../../actions/orderActions';


class MenuPage extends React.Component {
  render () {
    return (
      <div>
        <h1>{this.props.menu.name}</h1>
        <MenuDescription {...this.props.menu}/>
        <OrderAttributes />
        <LinkButton
          linkTo='/reservation'
          content='Next'
          btnProps={{onClick: this.props.updateOrder}}
        />
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
  params: React.PropTypes.shape({
    menuId: React.PropTypes.string.isRequired,
  }),
  updateOrder: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  menu: R.find(R.propEq('id', ownProps.params.menuId))(state.menus),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateOrder: () => {
    dispatch(updateOrderActionCreator({ menuId: ownProps.params.menuId }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
export { MenuPage };
