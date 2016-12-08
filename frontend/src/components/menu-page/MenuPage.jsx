import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import MenuDescription from './MenuDescription.jsx';
import MenuNamePrice from './MenuNamePrice.jsx';
import Navbar from '../navbar/Navbar.jsx';
import OrderAttributes from '../order-attributes/OrderAttributes.jsx';


class MenuPage extends React.Component {
  render() {
    return (
      <div>
        <Navbar title={this.props.menu.name}/>
        <div className='menudescription-div'>
          <div className='menudescription-div__div'>
            <img src={this.props.menu.image} alt='menu image'/>
            <MenuNamePrice menu={this.props.menu}/>
            <OrderAttributes menuId={this.props.menu.id} />
            <MenuDescription menu={this.props.menu}/>
          </div>
        </div>
      </div>
    );
  }
}

MenuPage.propTypes = {
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    chef: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
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
