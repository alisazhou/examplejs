import React from 'react';
import MenuListItem from './MenuListItem.jsx';


class MenuList extends React.Component {
  render () {
    return (
      <ul className='menu-list'>
        {this.props.menus.map(menu =>
          <MenuListItem key={menu.id} menu={menu}/>
        )}
      </ul>
    );
  }
}

MenuList.propTypes = {
  menus: React.PropTypes.array.isRequired,
};

export default MenuList;
