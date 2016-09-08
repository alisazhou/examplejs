import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuDescription from './MenuDescription.jsx';
import MenuPageNextButton from './MenuPageNextButton.jsx';
import OrderAttributes from './OrderAttributes.jsx';


class MenuPage extends React.Component {
  render () {
    return (
      <div>
        <h1>{this.props.menu.name}</h1>
        <MenuDescription {...this.props.menu}/>
        <OrderAttributes />
        <LinkButton linkTo='/' content='Back' />
        <MenuPageNextButton menuId={this.props.menu.id} />
      </div>
    );
  }
}

MenuPage.propTypes = {
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  params: React.PropTypes.shape({
    menuId: React.PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  menu: R.find(R.propEq('id', ownProps.params.menuId))(state.menus),
});

export default connect(mapStateToProps)(MenuPage);
export { MenuPage };
