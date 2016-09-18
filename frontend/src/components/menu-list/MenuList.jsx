import React from 'react';
import R from 'ramda';
import MenuListItem from './MenuListItem.jsx';


class MenuList extends React.Component {
  render () {
    return (
      <div className='menu-list'>
        { this.props.menus.length
            ? R.map(menu => <MenuListItem key={menu.id} menu={menu}/>, this.props.menus)
            : <h4>Sorry, we dont have any results for your search criterion</h4>
        }
      </div>
    );
  }
}

MenuList.propTypes = {
  menus: React.PropTypes.array.isRequired,
};

export default MenuList;
